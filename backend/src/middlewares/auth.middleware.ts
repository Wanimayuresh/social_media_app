import { NextFunction, Request, Response } from "express"
import { TokenService } from "../modules/auth/service/token.service"
import { AppError } from "../shared/errors/AppError"

const tokenService = new TokenService()


export const authMiddleware = (req:Request,res:Response,next:NextFunction):void=>{
const header = req.header("Authorization")

if(!header) throw new AppError("Unauthorized",401)
const [scheme ,token] = header.split(" ")
if (scheme !== "Bearer" || !token) {
    throw new AppError("Unauthorized", 401);
}
const payload =tokenService.verifyAccessToken(token)
req.user = payload
next()
}