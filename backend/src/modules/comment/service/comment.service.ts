import { AppError } from "../../../shared/errors/AppError";
import { ProblemRepository } from "../../problems/repository/problem.repository";
import { SolutionRepository } from "../../solutions/repository/solution.repository";
import { CommentRepository } from "../repository/comment.repository";
import { Comment, CreateCommentInput, UpdateCommentInput } from "../types/comment.types";

export class CommentService {
  private commentRepository = new CommentRepository();
  private problemRepository = new ProblemRepository();
  private solutionRepository = new SolutionRepository();
  async createProblemComment(problemId: string, userId: string, data: CreateCommentInput) {
    const comment = await this.problemRepository.findById(problemId);
    if (!comment) throw new AppError("Problem Not Found", 404);
    const createComment = await this.commentRepository.create(data, userId, problemId, null);
    return createComment;
  }

  async createSolutionComment(solutionId: string, userId: string, data: CreateCommentInput) {
    const comment = await this.solutionRepository.findById(solutionId);
    if (!comment) throw new AppError("Solution Not Found", 404);
    const solutionComment = await this.commentRepository.create(data, userId, null, solutionId);
    return solutionComment;
  }

  async createReply(
    parentCommentId: string,
    userId: string,
    data: CreateCommentInput,
  ): Promise<Comment> {
    const parentComment = await this.commentRepository.findById(parentCommentId);

    if (!parentComment) {
      throw new AppError("Comment not found", 404);
    }

    const replyData: CreateCommentInput = {
      ...data,
      parent_comment_id: parentCommentId,
    };

    if (parentComment.problem_id) {
      return this.commentRepository.create(replyData, userId, parentComment.problem_id, null);
    }

    if (parentComment.solution_id) {
      return this.commentRepository.create(replyData, userId, null, parentComment.solution_id);
    }

    throw new AppError("Invalid parent comment context", 500);
  }

  async getCommentsByProblem(problemId: string): Promise<Comment[]> {
    const problem = await this.problemRepository.findById(problemId);

    if (!problem) {
      throw new AppError("Problem not found", 404);
    }

    return this.commentRepository.findTopLevelByProblemId(problemId);
  }

  async getCommentsBySolution(solutionId: string): Promise<Comment[]> {
    const solution = await this.solutionRepository.findById(solutionId);

    if (!solution) {
      throw new AppError("Solution not found", 404);
    }

    return this.commentRepository.findTopLevelBySolutionId(solutionId);
  }

  async getReplies(parentCommentId: string): Promise<Comment[]> {
    const parentComment = await this.commentRepository.findById(parentCommentId);

    if (!parentComment) {
      throw new AppError("Comment not found", 404);
    }

    return this.commentRepository.findRepliesByParentId(parentCommentId);
  }
  async updateComment(commentId: string, userId: string, data: UpdateCommentInput) {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) throw new AppError("Comment not found", 404);
    if (comment.user_id !== userId) throw new AppError("You are not owner of this comment", 403);
    if (comment.status === "REMOVED") throw new AppError("Comment is already removed", 403);
    const updatedComment = await this.commentRepository.update(data, commentId);
    if (!updatedComment) throw new AppError("Failed to update comment", 500);
    return updatedComment;
  }
  async removeComment(commentId: string, userId: string) {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) throw new AppError("Comment not found", 404);
    if (comment.user_id !== userId) throw new AppError("You are not owner of this comment", 403);
    if (comment.status === "REMOVED")
      throw new AppError("You can not delte this Comment because Comment is already removed", 403);
    const deletedComment = await this.commentRepository.remove(commentId);
    if (!deletedComment) throw new AppError("Failed to delete comment", 500);
    return {
      success: "Comment deleted successfully",
    };
  }
}
