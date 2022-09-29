import { replace } from "svelte-spa-router"
import { token } from "../stores/token"
import { nft } from "./nft"

export class ApiError extends Error {
  public status: number

  public constructor(message: string, status: number) {
    super(message)
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
      this.AUTH_TOKEN = value || ""
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
      throw new ApiError(error as any, 500) // eslint-disable-line @typescript-eslint/no-explicit-any
    }

    if (!response.ok) {
      if (response.status === 401) {
        replace("/authentication")
      }

      nft.error(response.statusText)
      throw new ApiError(response.statusText, response.status)
    }

    return response.json().catch(() => ({}))
  }

  public static async get<S>(endpoint: string, auth?: boolean): Promise<S> {
    return await this.request(endpoint, "GET", undefined, auth)
  }

  public static async post<Q, S>(endpoint: string, body?: Q, auth?: boolean): Promise<S> {
    return await this.request(endpoint, "POST", body, auth)
  }

  public static async put<Q, S>(endpoint: string, body?: Q, auth?: boolean): Promise<S> {
    return await this.request(endpoint, "PUT", body, auth)
  }

  public static async delete<S>(endpoint: string, auth?: boolean): Promise<S> {
    return await this.request(endpoint, "DELETE", undefined, auth)
  }
}
