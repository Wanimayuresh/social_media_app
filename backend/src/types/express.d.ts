import { TokenPayload } from "../modules/auth/types/token.type";
//Declaration Merging (Module Augmentation)
declare global {
  namespace Express {
    interface Request {
      user: TokenPayload;
    }
  }
}

export {};