import { AppError } from "../../../shared/errors/AppError";
import { UserRepository } from "../repositories/user.repository";
import {UserResponse } from "../types/user.types";

export class UserService {
  private userRepository = new UserRepository();

  async getCurrentUser(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatarUrl: user.avatar_url,
    bio: user.bio,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
};
  }
}
