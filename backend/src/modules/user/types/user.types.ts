import { UserRole } from "../../../types/user.role";

export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  avatar_url: string | null;
  bio: string | null;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserInput {
  username: string;
  email: string;
  password_hash: string;
  avatar_url?: string;
  bio?: string;
  role?:UserRole
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserInput {
    username?: string;
    bio?: string;
    avatarUrl?: string | null;
}