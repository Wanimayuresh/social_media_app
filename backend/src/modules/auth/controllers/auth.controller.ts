import type { Request, Response } from "express";

import { AuthService } from "../service/auth.service";
import { REFRESH_TOKEN_COOKIE, refreshTokenCookieOptions } from "../../../shared/constants/cookies";
import { AppError } from "../../../shared/errors/AppError";
export class AuthController {
  private authService = new AuthService();

  async signUp(req: Request, res: Response) {
    const user = await this.authService.signUp(req.body);
    res.cookie(REFRESH_TOKEN_COOKIE, user.refreshToken, refreshTokenCookieOptions);

    const { refreshToken, ...response } = user;

    return res.status(201).json(response);
  }

  async login(req: Request, res: Response) {
    const user = await this.authService.login(req.body);
    res.cookie(REFRESH_TOKEN_COOKIE, user.refreshToken, refreshTokenCookieOptions);

    const { refreshToken, ...response } = user;

    return res.status(200).json(response);
  }
  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];

    if (!refreshToken) {
      throw new AppError("Refresh token required", 401);
    }

    const result = await this.authService.refresh(refreshToken);

    res.cookie(REFRESH_TOKEN_COOKIE, result.refreshToken, refreshTokenCookieOptions);

    return res.status(200).json({
      accessToken: result.accessToken,
    });
  }

  async updatePassword(req: Request, res: Response) {
    const updatePassword = await this.authService.changePassword(req.body);
    return res.status(200).json(updatePassword);
  }
  async logout(req: Request, res: Response) {
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];

    if (!refreshToken) {
      throw new AppError("Refresh token required", 401);
    }

    const logoutSession = await this.authService.logout(refreshToken);

    res.clearCookie(REFRESH_TOKEN_COOKIE, refreshTokenCookieOptions);

    return res.status(200).json(logoutSession);
  }
  async logoutAll(req: Request, res: Response) {
    const logoutSession = await this.authService.logoutAll(req.user.userId);

    res.clearCookie(REFRESH_TOKEN_COOKIE, refreshTokenCookieOptions);

    return res.status(200).json(logoutSession);
  }
}
