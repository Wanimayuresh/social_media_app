import { refreshSession } from "@/features/auth/api/auth.api";
import type { RefreshResponse } from "@/features/auth/api/auth.types";
import { getTokenSetter } from "./apiClient";

let refreshPromise: Promise<RefreshResponse> | null = null;

export async function getFreshAccessToken(): Promise<string> {
  if (refreshPromise) {
    const response = await refreshPromise;
    return response.accessToken;
  }

  refreshPromise = refreshSession();

  try {
    const response = await refreshPromise;

    const tokenSetter = getTokenSetter();

    if (!tokenSetter) {
      throw new Error("Token setter is not configured");
    }

    tokenSetter(response.accessToken);

    return response.accessToken;
  } finally {
    refreshPromise = null;
  }
}