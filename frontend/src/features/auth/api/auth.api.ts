import { apiClient } from "@/app/service/apiClient";
import {
    type LogOutResponse,
    type AuthResponse,
    type RefreshResponse,
    type SignInInput,
    type SignUpInput,
} from "./auth.types";

export function refreshSession(){
    const api ="/api/v1/auth/refresh"
    return apiClient.post<RefreshResponse>(api, undefined, { credentials: "include", skipAuthRefresh: true, })
}

export function signUp(body:SignUpInput){
    const api = "/api/v1/auth/sign-up"
    return apiClient.post<AuthResponse>(api, body, { credentials: "include" })
}

export function login(body:SignInInput){
    const api ="/api/v1/auth/login"
    return apiClient.post<AuthResponse>(api, body, { credentials: "include" })
}
export function logout(){
    const api = "/api/v1/auth/logout"
    return apiClient.post<LogOutResponse>(api,undefined,{ credentials: "include" })
}
