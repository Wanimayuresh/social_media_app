import { Request, Response } from "express";
import { SolutionService } from "../service/solution.service";

type ProblemIdParams = {
  problemId: string;
};

type SolutionIdParams = {
  solutionId: string;
};

export class SolutionController{
    private solutionService= new SolutionService()

    async createSolution(req:Request<ProblemIdParams>, res:Response){
        const solution = await this.solutionService.createSolution(req.body,req.params.problemId,req.user.userId)
        return res.status(201).json(solution)
    }

    async getSolutionByProblems(req:Request<ProblemIdParams>,res:Response){
        const solution = await this.solutionService.getSolutionsByProblem(req.params.problemId)
        return res.status(200).json(solution)
    }

    async getSolutionById(req:Request<SolutionIdParams>,res:Response){
        const solution = await this.solutionService.getSolutionById(req.params.solutionId);
        return res.status(200).json(solution)
    }

    async updateSolution(req:Request<SolutionIdParams>,res:Response){
        const solution = await this.solutionService.updateSolution(req.params.solutionId,req.user.userId,req.body)
        return res.status(200).json(solution)
    }

    async removeSolution(req:Request<SolutionIdParams>,res:Response){
        const result = await this.solutionService.removeSolution(req.params.solutionId,req.user.userId)
        return res.status(200).json(result)
    }

    async acceptSolution(req:Request<SolutionIdParams>,res:Response){
        const accepteSolution = await this.solutionService.acceptSolution(req.params.solutionId,req.user.userId)
        return res.status(200).json(accepteSolution)
    }   
}