import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode: number = StatusCodes.OK,
): void {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendCreated<T>(res: Response, data: T, message = "Created"): void {
  sendSuccess(res, data, message, StatusCodes.CREATED);
}

export function sendNoContent(res: Response): void {
  res.status(StatusCodes.NO_CONTENT).send();
}

export function sendError(
  res: Response,
  message: string,
  errors: string[] = [],
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
): void {
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}
