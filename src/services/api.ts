import { replace } from "svelte-spa-router"
import { token } from "../stores/token"
import { nft } from "./nft"

export enum ApiErrorCode {
  ERR_INVALID_REQUEST = 0,
  ERR_UNAUTHORIZED,
  ERR_NO_PERMISSION,
  ERR_NOT_FOUND,
  ERR_SERVER_GENERIC,
}

export class ApiError extends Error {
  public code: ApiErrorCode
  public status: number

  public constructor(code: ApiErrorCode, message: string, status: number) {
    super(message)
    this.code = code
    this.status = status
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

export class api {
  private static BASE_URL = location.origin + "/api"
  private static AUTH_HEADER = "Authorization"
  private static AUTH_TOKEN = ""

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static {
    token.subscribe((value) => {
      this.AUTH_TOKEN = value
    })
  }

  private static async request<Q, S>(endpoint: string, method: string, body?: Q, auth?: boolean): Promise<S> {
    let response

    try {
      response = await fetch(this.BASE_URL + endpoint, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...(auth && { [this.AUTH_HEADER]: this.AUTH_TOKEN }),
        },
        method: method,
        body: body && JSON.stringify(body),
      })
    } catch (error) {
      nft.error(error as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      throw new ApiError(ApiErrorCode.ERR_SERVER_GENERIC, error as any, 500) // eslint-disable-line @typescript-eslint/no-explicit-any
    }

    if (!response.ok) {
      if (response.status === 401) {
        replace("/authentication")
      }

      let code = ApiErrorCode.ERR_SERVER_GENERIC
      let message = response.statusText
      const status = response.status

      try {
        const error = await response.json()

        if (error.code) {
          code = ApiErrorCode[error.code as keyof typeof ApiErrorCode]
        }

        if (error.message) {
          message = error.message
        }
        // eslint-disable-next-line no-empty
      } catch {}

      nft.error(message)
      throw new ApiError(code, message, status)
    }

    return response.json()
  }

  public static async get<S>(endpoint: string, auth = true): Promise<S> {
    return await this.request(endpoint, "GET", undefined, auth)
  }

  public static async post<Q, S>(endpoint: string, body?: Q, auth = true): Promise<S> {
    return await this.request(endpoint, "POST", body, auth)
  }

  public static async put<Q, S>(endpoint: string, body?: Q, auth = true): Promise<S> {
    return await this.request(endpoint, "PUT", body, auth)
  }

  public static async delete<S>(endpoint: string, auth = true): Promise<S> {
    return await this.request(endpoint, "DELETE", undefined, auth)
  }
}
