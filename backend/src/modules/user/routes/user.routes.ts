import { Router } from "express";
import { UserController } from "../controller/user.controller";

const userController = new UserController()
const router = Router()
router.get("/me",userController.getCurrentUser.bind(userController))

export default router