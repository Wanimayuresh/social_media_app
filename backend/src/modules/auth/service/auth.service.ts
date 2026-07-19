import { AppError } from "../../../shared/errors/AppError";
import { UserRepository } from "../../user/repositories/user.repository";
import { CreateUserInput, User } from "../../user/types/user.types";
import { RefreshTokenRepository } from "../repositery/refresh-token.repository";
import { AuthResponse, ChangePasswordInput, SignInInput, SignUpInput } from "../types/auth.types";

import { PasswordService } from "./password.service";
import { RefreshTokenHashService } from "./refresh-token-hash.service";
import { TokenService } from "./token.service";

export class AuthService {
  private userRepository = new UserRepository();
  private refreshTokenRepository = new RefreshTokenRepository();
  private passwordService = new PasswordService();
  private tokenService = new TokenService();
  private refreshTokenHashService = new RefreshTokenHashService();
  private buildAuthResponse(user: User, accessToken: string, refreshToken: string): AuthResponse {
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatar_url,
        bio: user.bio,
      },
      accessToken,
      refreshToken,
    };
  }
  private async saveRefreshSession(userId: string, refreshToken: string): Promise<void> {
    const refreshTokenHash = this.refreshTokenHashService.hash(refreshToken);

    const expiresAt = this.tokenService.getExpirationDate(refreshToken);

    await this.refreshTokenRepository.create({
      userId,
      refreshTokenHash,
      expiresAt,
    });
  }

  async signUp(data: SignUpInput): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    // Handle Email Already Exist
    if (existingUser) {
      throw new AppError("Email already exists", 409);
    }
    //Hash Password
    const passwordHash = await this.passwordService.hash(data.password);

    const createUserData: CreateUserInput = {
      username: data.username,
      email: data.email,
      password_hash: passwordHash,
    };
    const user = await this.userRepository.create(createUserData);
    const accessToken = this.tokenService.generateAccessToken({ userId: user.id });
    const refreshToken = this.tokenService.generateRefreshToken({ userId: user.id });
    const result = this.buildAuthResponse(user, accessToken, refreshToken);
    await this.saveRefreshSession(user.id, refreshToken);
    return result;
  }

  async login(data: SignInInput): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (!existingUser) throw new AppError("Incorrect Email or Password", 401);
    const comparePassword = await this.passwordService.compare(
      data.password,
      existingUser.password_hash,
    );
    if (!comparePassword) {
      throw new AppError("Incorrect Email or Password", 401);
    }
    const accessToken = this.tokenService.generateAccessToken({ userId: existingUser.id });
    const refreshToken = this.tokenService.generateRefreshToken({ userId: existingUser.id });

    const result = this.buildAuthResponse(existingUser, accessToken, refreshToken);
    await this.saveRefreshSession(existingUser.id, refreshToken);

    return result;
  }

  async refresh(refreshToken: string) {
    const payload = this.tokenService.verifyRefreshToken(refreshToken);
    const hash = this.refreshTokenHashService.hash(refreshToken);
    const findSession = await this.refreshTokenRepository.findByHash(hash);
    if (!findSession) throw new AppError("Invalid refresh session", 401);
    const isValidUser = await this.userRepository.findById(payload.userId);
    if (!isValidUser) throw new AppError("Unauthorized user", 401);
    await this.refreshTokenRepository.delete(findSession.id);
    const newAccessToken = this.tokenService.generateAccessToken({ userId: payload.userId });
    const newRefreshToken = this.tokenService.generateRefreshToken({ userId: payload.userId });
    await this.saveRefreshSession(payload.userId, newRefreshToken);
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async changePassword(data: ChangePasswordInput) {
    const existingUser = await this.userRepository.findById(data.userId);
    if (!existingUser) throw new AppError("User not found", 404);
    const comparePassword = await this.passwordService.compare(
      data.currentPassword,
      existingUser.password_hash,
    );
    if (!comparePassword) throw new AppError("Incorrect Password", 401);
    const newPassword = await this.passwordService.hash(data.newPassword);
    await this.userRepository.updatePassword(newPassword, data.userId);
    await this.refreshTokenRepository.deleteByUserId(
        data.userId
    );
    return {
     success: "Password updated successfully. Please log in again.",
    };
  }
  async logout(refreshToken: string) {
    this.tokenService.verifyRefreshToken(refreshToken);

    const refreshTokenHash = this.refreshTokenHashService.hash(refreshToken);

    const session = await this.refreshTokenRepository.findByHash(refreshTokenHash);

    if (!session) {
      throw new AppError("Invalid refresh session", 401);
    }

    await this.refreshTokenRepository.delete(session.id);

    return {
      success: "Current device logged out successfully",
    };
  }

  async logoutAll(userId: string) {
    await this.refreshTokenRepository.deleteByUserId(userId);

    return {
      success: "Logged out from all devices",
    };
  }
}
