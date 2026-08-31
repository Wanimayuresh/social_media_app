import { withTransaction } from "../../../shared/database/transaction";
import { AppError } from "../../../shared/errors/AppError";
import { ProblemRepository } from "../../problems/repository/problem.repository";
import { SolutionRepository } from "../repository/solution.repository";
import { CreateSolutionInput, Solution, UpdateSolutionInput } from "../types/solutions.types";

export class SolutionService {
  private solutionRepository = new SolutionRepository();
  private problemRepository = new ProblemRepository();

  async createSolution(
    data: CreateSolutionInput,
    problemId: string,
    userId: string,
  ): Promise<Solution> {
    const Problem = await this.problemRepository.findById(problemId);
    if (!Problem) throw new AppError("Problem Not Exist", 404);
    return await this.solutionRepository.create(data, problemId, userId);
  }

  async getSolutionsByProblem(problemId: string): Promise<Solution[]> {
    const problem = await this.problemRepository.findById(problemId);

    if (!problem) {
      throw new AppError("Problem not found", 404);
    }

    return await this.solutionRepository.findByProblemId(problemId);
  }

  async getSolutionById(solutionId: string): Promise<Solution> {
    const solution = await this.solutionRepository.findById(solutionId);
    if (!solution) throw new AppError("Solution not found", 404);
    return solution;
  }

  async updateSolution(
    solutionId: string,
    userId: string,
    data: UpdateSolutionInput,
  ): Promise<Solution> {
    const solution = await this.solutionRepository.findById(solutionId);

    if (!solution) {
      throw new AppError("Solution not found", 404);
    }

    if (solution.user_id !== userId) {
      throw new AppError("You are not the owner of this solution", 403);
    }

    if (solution.status !== "ACTIVE") {
      throw new AppError("Only active solutions can be updated", 403);
    }

    const updatedSolution = await this.solutionRepository.update(data, solutionId);

    if (!updatedSolution) {
      throw new AppError("Failed to update solution", 500);
    }

    return updatedSolution;
  }

  async removeSolution(solutionId: string, userId: string): Promise<Solution | null> {
    const solution = await this.solutionRepository.findById(solutionId);

    if (!solution) {
      throw new AppError("Solution not found", 404);
    }

    if (solution.user_id !== userId) {
      throw new AppError("You are not the owner of this solution", 403);
    }

    if (solution.status !== "ACTIVE") {
      throw new AppError("Only active solutions can be deleted", 403);
    }

    const removeSolution = await this.solutionRepository.remove(solutionId);
    if (!removeSolution) {
      throw new AppError("Failed to delete solution", 500);
    }
    return removeSolution;
  }

  async acceptSolution(solutionId: string, userId: string): Promise<Solution> {
    const solution = await this.solutionRepository.findById(solutionId);

    if (!solution) {
      throw new AppError("Solution not found", 404);
    }

    const problem = await this.problemRepository.findById(solution.problem_id);
    if (!problem) throw new AppError("Problem not exist", 404);
    if (userId !== problem.user_id) throw new AppError("You are not owner of this problem", 403);
    if (solution.status !== "ACTIVE")
      throw new AppError("Only active solutions can be accepted", 403);

   return withTransaction(async (client) => {
      // accept solution
      const acceptSolution = await this.solutionRepository.accept(solutionId, client);
      if (!acceptSolution) throw new AppError("Solution is not accepted", 403);
      // mark problem solved
      const problemSolved =await this.problemRepository.markSolved(solution.problem_id, client);
    if(!problemSolved) throw new AppError("Failed to mark problem as solved", 500);
      // return accepted solution
      return acceptSolution;
    });
  }
}
