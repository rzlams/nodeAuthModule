import { NextFunction, Request, Response } from "express";

class HttpException extends Error {
  statusCode: number;
  message: string;
  statusMessage: string;

  constructor(statusCode: number, message: string, statusMessage?: string) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message || "Something went wrong";
    this.statusMessage = statusMessage || "error";
  }
}

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode;
  const message = err.message;
  const statusMessage = err.statusMessage;

  res.status(statusCode).send({
    code: statusCode,
    status: statusMessage,
    message,
  });
};

export { errorHandler, HttpException };
