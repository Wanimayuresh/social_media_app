export interface SignUpInput{
   username:string;
   email:string;
   password:string
}

export interface SignInInput{
    email:string;
    password:string
}
interface SafeUser{
    id:string,
    username:string,
    email:string,
    avatarUrl:string | null,
    bio:string|null
}
export interface AuthResponse {
    user:SafeUser
    accessToken:string;
    refreshToken:string
}

export interface ChangePasswordInput{
    userId:string;
    currentPassword:string;
    newPassword:string;
}