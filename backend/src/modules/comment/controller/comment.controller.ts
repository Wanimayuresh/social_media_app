import { Request, Response } from "express";
import { CommentService } from "../service/comment.service";

type ProblemCommentdParams = { problemId: string };
type SolutionCommentdParams = { solutionId: string };
type ReplyParams = { commentId: string };
export class CommentController {
  private commentService = new CommentService();
  async createProblemComment(req: Request<ProblemCommentdParams>, res: Response) {
    const comment = await this.commentService.createProblemComment(
      req.params.problemId,
      req.user.userId,
      req.body,
    );
    return res.status(201).json(comment);
  }
  async createSolutionComment(req: Request<SolutionCommentdParams>, res: Response) {
    const comment = await this.commentService.createSolutionComment(
      req.params.solutionId,
      req.user.userId,
      req.body,
    );
    return res.status(201).json(comment);
  }
  async createReply(req: Request<ReplyParams>, res: Response) {
    const reply = await this.commentService.createReply(
      req.params.commentId,
      req.user.userId,
      req.body,
    );
    return res.status(201).json(reply);
  }
  async getCommentsByProblem(req: Request<ProblemCommentdParams>, res: Response) {
    const comments = await this.commentService.getCommentsByProblem(req.params.problemId);
    return res.status(200).json(comments);
  }
  async getCommentsBySolution(req: Request<SolutionCommentdParams>, res: Response) {
    const comments = await this.commentService.getCommentsBySolution(req.params.solutionId);
    return res.status(200).json(comments);
  }
  async getReplies(req: Request<ReplyParams>, res: Response) {
    const replies = await this.commentService.getReplies(req.params.commentId);
    return res.status(200).json(replies);
  }
  async updateComment(req: Request<ReplyParams>, res: Response) {
    const comment = await this.commentService.updateComment(
      req.params.commentId,
      req.user.userId,
      req.body,
    );
    return res.status(200).json(comment);
  }
  async removeComment(req: Request<ReplyParams>, res: Response) {
    const result = await this.commentService.removeComment(req.params.commentId, req.user.userId);

    return res.status(200).json(result);
  }
}
