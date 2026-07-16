import { Request,Response } from "express";
import { UserService } from "../service/user.service";

export class UserController{
    private userService = new UserService()
     async getCurrentUser(req:Request,res:Response){
        const user = await this.userService.getCurrentUser(req.user?.userId);
        return res.status(200).json(user)
     }
}