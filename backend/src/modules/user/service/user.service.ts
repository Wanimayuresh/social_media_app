import { AppError } from "../../../shared/errors/AppError";
import { UserRepository } from "../repositories/user.repository";
import { UpdateUserInput, UserResponse } from "../types/user.types";

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

  async updateProfile(userId: string, data: UpdateUserInput): Promise<UserResponse> {
    const updateUser = await this.userRepository.updateProfile(userId, data);
    return {
      id: updateUser.id,
      username: updateUser.username,
      email: updateUser.email,
      avatarUrl: updateUser.avatar_url,
      bio: updateUser.bio,
      createdAt: updateUser.created_at,
      updatedAt: updateUser.updated_at,
    };
  }
}
