import { Router } from "express";
import { SolutionController } from "../controller/solution.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const solutionController = new SolutionController()

const router = Router();

router.post(
    "/problems/:problemId/solutions",
    authMiddleware,
    solutionController.createSolution.bind(solutionController)
);

router.get(
    "/problems/:problemId/solutions",
     solutionController.getSolutionByProblems.bind(solutionController)
);

router.get(
    "/solutions/:solutionId",
    solutionController.getSolutionById.bind(solutionController)

);

router.patch(
    "/solutions/:solutionId",
    authMiddleware,
    solutionController.updateSolution.bind(solutionController)
)

router.delete(
    "/solutions/:solutionId",
    authMiddleware,
    solutionController.removeSolution.bind(solutionController)
);

router.patch(
    "/solutions/:solutionId/accept",
    authMiddleware,
    solutionController.acceptSolution.bind(solutionController)
)

export default router