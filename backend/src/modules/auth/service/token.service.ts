import jwt, { SignOptions } from "jsonwebtoken";

import { env } from "../../../config/env";
import { TokenPayload } from "../types/token.type";
import { AppError } from "../../../shared/errors/AppError";

export class TokenService {
  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: env.JWT_ACCESS_EXPIRES_IN as NonNullable<SignOptions["expiresIn"]>,
    });
  }

  generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN as NonNullable<SignOptions["expiresIn"]>,
    });
  }

  verifyAccessToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
      return decoded as TokenPayload;
    } catch {
      throw new AppError("Invalid or expired token", 401);
    }
  }

  verifyRefreshToken(token:string):TokenPayload{
    try {
        const decoded = jwt.verify(token,env.JWT_REFRESH_SECRET)
        return decoded as TokenPayload
    } catch {
         throw new AppError("Invalid or expired token", 401);
    }
  }

  getExpirationDate(token: string): Date {
      const verified = jwt.verify(token, env.JWT_REFRESH_SECRET) as jwt.JwtPayload;
      return new Date(verified.exp! * 1000);
    
  }
}
