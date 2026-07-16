import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
const authController = new AuthController();
const router = Router()
router.post("/sign-up",authController.signUp.bind(authController))
router.post("/login",authController.login.bind(authController))
router.post("/refresh",authController.refresh.bind(authController))
router.patch("/change-password",authMiddleware,authController.updatePassword.bind(authController))

export default router;