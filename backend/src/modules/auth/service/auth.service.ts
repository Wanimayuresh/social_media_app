import { AppError } from "../../../shared/errors/AppError";
import { UserRepository } from "../../user/repositories/user.repository";
import { CreateUserInput, User } from "../../user/types/user.types";
import { AuthResponse, ChangePasswordInput, SignInInput, SignUpInput } from "../types/auth.types";

import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";

export class AuthService {
  private userRepository = new UserRepository();
  private passwordService = new PasswordService();
  private tokenService = new TokenService();
  private buildAuthResponse(user: User): AuthResponse {
    const accessToken = this.tokenService.generateAccessToken({ userId: user.id });
    const refreshToken = this.tokenService.generateRefreshToken({ userId: user.id });
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
    return this.buildAuthResponse(user);
  }

  async login(data: SignInInput): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (!existingUser) throw new AppError("Incorrect Email or Password", 401);
    const comparePassword = await this.passwordService.compare(
      data.password,existingUser.password_hash
    );
    if (!comparePassword) {
      throw new AppError("Incorrect Email or Password", 401);
    }

    return this.buildAuthResponse(existingUser);
  }

  async refresh(refreshToken:string){
    const payload =this.tokenService.verifyRefreshToken(refreshToken)
    const isValidUser = await this.userRepository.findById(payload.userId)
    if(!isValidUser) throw new AppError("Unauthorized user",401)
      const newToken = this.tokenService.generateAccessToken({ userId: payload.userId })
     return {
    accessToken: newToken,
};
  }

  async changePassword(data:ChangePasswordInput){
     const existingUser = await this.userRepository.findById(data.userId)
     if(!existingUser) throw new AppError("User not found",404)
      const comparePassword = await this.passwordService.compare(data.currentPassword,existingUser.password_hash)
    if(!comparePassword) throw new AppError("Incorrect Password",401)
      const newPassword  = await this.passwordService.hash(data.newPassword)
     await this.userRepository.updatePassword(newPassword,data.userId)
    return {
      success:"Password Updated Successfully"
    }

  }
}
