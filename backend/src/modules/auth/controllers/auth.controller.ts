import type { Request, Response } from "express";

import { AuthService } from "../service/auth.service";
export class AuthController{
    private authService = new AuthService()

    async signUp(req:Request,res:Response){
        const user =await this.authService.signUp(req.body)
        return res.status(201).json(user)
    }

    async login(req:Request,res:Response){
        const user = await this.authService.login(req.body)
        return res.status(200).json(user)
    }
    async refresh(req:Request,res:Response){
        const newToken = await this.authService.refresh(req.body.refreshToken)
        return res.status(200).json(newToken)
    }

    async updatePassword(req:Request,res:Response){
        const updatePassword = await this.authService.changePassword(req.body)
        return res.status(200).json(updatePassword)
    }
}