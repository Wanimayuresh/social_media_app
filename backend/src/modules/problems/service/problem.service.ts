import { AppError } from "../../../shared/errors/AppError";
import { CreateProblemInput, UpdateProblemInput } from "../problems.types";
import { ProblemRepository } from "../repository/problem.repository";

export class ProblemService {
  private problemRepository = new ProblemRepository();

  async createProblem(data: CreateProblemInput, userId: string) {
    return await this.problemRepository.create(data, userId);
  }
  async getProblems() {
    return await this.problemRepository.findAllProblems();
  }
  async getProblemById(id: string) {
    const problem = await this.problemRepository.findById(id);
    if (!problem) throw new AppError("Not Found", 404);
    return problem;
  }
  async updateProblem(problemId: string, userId: string, data: UpdateProblemInput) {
    const isProblem = await this.problemRepository.findById(problemId);
    if (!isProblem) throw new AppError("Problem Not Found", 404);
    if (isProblem.user_id !== userId) throw new AppError("You are not owner of this problem", 403);
    if (isProblem.status === "SOLVED") throw new AppError("Problem is already solved", 403);
    const updateProblem = await this.problemRepository.update(data, problemId);
    return updateProblem;
  }
  async deleteProblem(problemId: string, userId: string) {
    const isProblem = await this.problemRepository.findById(problemId);
    if (!isProblem) throw new AppError("Problem not found", 404);
    if (isProblem.user_id !== userId) throw new AppError("You are not owner og this problem", 403);
    if (isProblem.status === "SOLVED")
      throw new AppError("You can not delete this Problem because Problem is solved", 403);
    await this.problemRepository.delete(problemId);

    return {
      success: "Problem deleted successfully",
    };
  }
}
