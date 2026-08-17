import { env } from "../config/env";
import { getFreshAccessToken } from "./authRefresh";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface RequestOptions {
  method: HttpMethod;
  url: string;
  body?: unknown;
  credentials?: RequestCredentials;
  skipAuthRefresh?: boolean;
}
interface RequestConfig {
  credentials?: RequestCredentials;
  skipAuthRefresh?: boolean;
}
type TokenProvider = () => string | null;
type TokenSetter = (token: string) => void;

let tokenProvider: TokenProvider | null = null;
let tokenSetter: TokenSetter | null = null;

export const setTokenProvider = (provider: TokenProvider) => {
  tokenProvider = provider;
};

export const setTokenSetter = (provider: TokenSetter) => {
  tokenSetter = provider;
};

export const getTokenSetter = (): TokenSetter | null => {
  return tokenSetter;
};

const request = async function <T>(
  options: RequestOptions,
  isRetried: boolean = false,
): Promise<T> {
  const url = env.apiUrl + options.url;

  const token = tokenProvider?.();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(url, {
    method: options.method,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    credentials: options.credentials,
  });

  // Successful response
  if (response.ok) {
    return response.json();
  }

  // Access token expired/invalid
  if (response.status === 401 && !isRetried && !options.skipAuthRefresh) {
    await getFreshAccessToken();

    // Retry once with the newly refreshed access token
    return request<T>(options, true);
  }

  // Refresh failed or some other HTTP error
  throw new Error(`Request failed: ${response.status}`);
};
export const apiClient = {
  get: async function <T>(url: string): Promise<T> {
    return request<T>({
      method: "GET",
      url,
    });
  },
  post: async function <T>(
    url: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    return request<T>({
      method: "POST",
      url,
      body,
      credentials: config?.credentials,
      skipAuthRefresh: config?.skipAuthRefresh,
    });
  },
  delete: async function <T>(url: string, config?: RequestConfig): Promise<T> {
    return request<T>({
      method: "DELETE",
      url,
      credentials: config?.credentials,
      skipAuthRefresh: config?.skipAuthRefresh,
    });
  },
};
