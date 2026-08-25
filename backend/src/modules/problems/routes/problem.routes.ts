import { Router } from "express";

import { authMiddleware } from "../../../middlewares/auth.middleware";
import { validate } from "../../../middlewares/validate.middleware";

import { ProblemController } from "../controller/problems.controller";
import {
  createProblemSchema,
  updateProblemSchema,
} from "../validation/problem.schema";

const problemController = new ProblemController();

const router = Router();

router.post(
  "/problems",
  authMiddleware,
  validate(createProblemSchema),
  problemController.createProblem.bind(problemController),
);

router.get(
  "/problems",
  problemController.getAllProblems.bind(problemController),
);

router.get(
  "/problems/:id",
  problemController.getProblemById.bind(problemController),
);

router.patch(
  "/problems/:id",
  authMiddleware,
  validate(updateProblemSchema),
  problemController.updateProblem.bind(problemController),
);

router.delete(
  "/problems/:id",
  authMiddleware,
  problemController.deleteProblem.bind(problemController),
);

export default router;