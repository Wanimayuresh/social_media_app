import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { isProduction } from "../config/env";
import { logger } from "../config/logger";
import { MESSAGES } from "../shared/constants/messages";
import { AppError } from "../shared/errors/AppError";
import { sendError } from "../shared/helpers/response";

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
  const message =
    isAppError || !isProduction ? (err as Error).message : MESSAGES.INTERNAL_SERVER_ERROR;
  const errors = isAppError ? err.errors : [];

  logger.error(
    {
      err,
      method: req.method,
      path: req.originalUrl,
      statusCode,
    },
    "Request failed",
  );

  sendError(res, message, errors, statusCode);
}
