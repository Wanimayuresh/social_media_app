import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { MESSAGES } from "../shared/constants/messages";
import { AppError } from "../shared/errors/AppError";

export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(new AppError(MESSAGES.routeNotFound(req.method, req.originalUrl), StatusCodes.NOT_FOUND));
}
