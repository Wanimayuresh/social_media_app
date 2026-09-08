import { Router } from "express";

import { authMiddleware } from "../../../middlewares/auth.middleware";
import { CommentController } from "../controller/comment.controller";

const router = Router();

const commentController = new CommentController();

// Create comments
router.post(
  "/problems/:problemId/comments",
  authMiddleware,
  commentController.createProblemComment.bind(commentController)
);

router.post(
  "/solutions/:solutionId/comments",
  authMiddleware,
  commentController.createSolutionComment.bind(commentController)
);

// Create reply
router.post(
  "/comments/:commentId/replies",
  authMiddleware,
  commentController.createReply.bind(commentController)
);

// Get comments
router.get(
  "/problems/:problemId/comments",
  commentController.getCommentsByProblem.bind(commentController)
);

router.get(
  "/solutions/:solutionId/comments",
  commentController.getCommentsBySolution.bind(commentController)
);

// Get replies
router.get(
  "/comments/:commentId/replies",
  commentController.getReplies.bind(commentController)
);

// Update comment
router.patch(
  "/comments/:commentId",
  authMiddleware,
  commentController.updateComment.bind(commentController)
);

// Remove comment
router.delete(
  "/comments/:commentId",
  authMiddleware,
  commentController.removeComment.bind(commentController)
);

export default router;