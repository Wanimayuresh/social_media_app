import { UserRole } from "../../../types/user.role";

export interface TokenPayload{
    userId:string;
    role:UserRole
}