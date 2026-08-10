import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { validate } from "../../../middlewares/validate.middleware";
import { updateProfileSchema } from "../validations/user.schema";

const userController = new UserController()
const router = Router()
router.get("/me",userController.getCurrentUser.bind(userController))
router.patch("/me",validate(updateProfileSchema),userController.updateProfile.bind(userController))

export default router