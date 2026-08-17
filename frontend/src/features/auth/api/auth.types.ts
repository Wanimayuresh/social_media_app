export interface RefreshResponse {
  accessToken: string;
}
export interface MeResponse {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}

 interface SafeUserResponse {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
}

export interface SignUpInput{
  username:string;
  email:string;
  password:string
}
export interface SignInInput{
  email:string;
  password:string
}

//Signup and Login Response
export interface AuthResponse{
  user:SafeUserResponse;
  accessToken:string

}

export interface LogOutResponse{
  success:string
}