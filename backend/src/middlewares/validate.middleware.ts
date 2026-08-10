import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { AppError } from "../shared/errors/AppError";

export const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message);
      throw new AppError("Validation failed", 400, errors);
    }

    req.body = result.data;
    next();
  };
