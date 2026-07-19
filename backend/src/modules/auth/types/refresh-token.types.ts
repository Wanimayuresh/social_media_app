export interface RefreshToken{
    id:string;
    userId:string;
    refreshTokenHash:string;
    expiresAt:Date;
    createdAt:Date;
    updatedAt:Date
}

export interface CreateRefreshToken {
    userId:string;
    refreshTokenHash:string
    expiresAt:Date
}