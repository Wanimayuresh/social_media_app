import { Request, Response } from "express";
import { ProblemService } from "../service/problem.service";

type ProblemIdParams = { id: string };

export class ProblemController {
  private problemService = new ProblemService();

  async createProblem(req: Request, res: Response) {
    const problem = await this.problemService.createProblem(req.body, req.user.userId);
    return res.status(201).json(problem);
  }

  async getAllProblems(req: Request, res: Response) {
    const problems = await this.problemService.getProblems();
    return res.status(200).json(problems);
  }

  async getProblemById(req: Request<ProblemIdParams>, res: Response) {
    const problem = await this.problemService.getProblemById(req.params.id);
    return res.status(200).json(problem);
  }

  async updateProblem(req: Request<ProblemIdParams>, res: Response) {
    const problem = await this.problemService.updateProblem(
      req.params.id,
      req.user.userId,
      req.body,
    );

    return res.status(200).json(problem);
  }

  async deleteProblem(req:Request<ProblemIdParams>,res:Response){
    const result = await this.problemService.deleteProblem(req.params.id,req.user.userId)
    return res.status(200).json(result)
  }
}
