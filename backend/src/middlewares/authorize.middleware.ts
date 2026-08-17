import { NextFunction, Request, Response } from "express"
import { UserRole } from "../types/user.role"
import { AppError } from "../shared/errors/AppError"

export const authorizeRole =(...allowedRoles:UserRole[])=>{
  return (req:Request,_res:Response,next:NextFunction)=>{
      const userRole = req.user.role
    const isAllowed = allowedRoles.includes(userRole)
    if(!isAllowed) throw new AppError("You do not have permission to perform this action",403)
    next()
  }
}