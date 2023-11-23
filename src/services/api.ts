import { location, replace } from "svelte-spa-router";
import { get } from "svelte/store";
import { token } from "../stores";
import { ApiError, ApiErrorCode } from "../types";
import { notifier } from "./notifier";

export class api {
  private static BASE_URL = window.location.origin + "/api";
  private static AUTH_HEADER = "Authorization";
  private static AUTH_TOKEN = "";

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static {
    token.subscribe((value) => {
      this.AUTH_TOKEN = value;
    });
  }

  private static async request<Q, S>(endpoint: string, method: string, body?: Q, auth?: boolean): Promise<S> {
    let response;

    try {
      response = await fetch(this.BASE_URL + endpoint, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...(auth && { [this.AUTH_HEADER]: this.AUTH_TOKEN }),
        },
        method: method,
        body: body && JSON.stringify(body),
      });
    } catch (error) {
      notifier.error(error as any); // eslint-disable-line @typescript-eslint/no-explicit-any
      throw new ApiError(ApiErrorCode.ERR_SERVER_GENERIC, error as any, 500); // eslint-disable-line @typescript-eslint/no-explicit-any
    }

    if (!response.ok) {
      if (response.status === 401) {
        replace(`/authentication?location=${get(location)}`);
      }

      let code = ApiErrorCode.ERR_SERVER_GENERIC;
      let message = response.statusText;
      const status = response.status;

      try {
        const error = await response.json();

        if (error.code) {
          code = ApiErrorCode[error.code as keyof typeof ApiErrorCode];
        }

        if (error.message) {
          message = error.message;
        }
        // eslint-disable-next-line no-empty
      } catch {}

      notifier.error(message);
      throw new ApiError(code, message, status);
    }

    return response.json();
  }

  public static async get<S>(endpoint: string, auth = true): Promise<S> {
    return await this.request(endpoint, "GET", undefined, auth);
  }

  public static async post<Q, S>(endpoint: string, body?: Q, auth = true): Promise<S> {
    return await this.request(endpoint, "POST", body, auth);
  }

  public static async put<Q, S>(endpoint: string, body?: Q, auth = true): Promise<S> {
    return await this.request(endpoint, "PUT", body, auth);
  }

  public static async delete<S>(endpoint: string, auth = true): Promise<S> {
    return await this.request(endpoint, "DELETE", undefined, auth);
  }
}
