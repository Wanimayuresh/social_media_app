// shared/constants/cookies.ts

export const REFRESH_TOKEN_COOKIE = "refresh_token";

export const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax" as const,
};