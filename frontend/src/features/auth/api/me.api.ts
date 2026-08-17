import { apiClient } from "@/app/service/apiClient";
import { type MeResponse } from "./auth.types";

export function getMe(){
    const api ="/api/v1/me";
    return apiClient.get<MeResponse>(api)
}