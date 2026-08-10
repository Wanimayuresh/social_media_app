import { apiClient } from "@/app/service/apiClient";
import type { RefreshResponse } from "./auth.types";

export function refreshSession(){
    const api ="/api/v1/auth/refresh"
    return apiClient.post<RefreshResponse>(api)
}