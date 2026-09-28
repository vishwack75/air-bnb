import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import { sendError } from '../utils/apiResponse';
import { config } from '../config/env';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];

  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid resource ID format: ${err.value}`;
  }

  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value entered for field '${field}'. Please use another value.`;
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Database validation error';
    errors = Object.values(err.errors).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
  }

  if (config.nodeEnv === 'development' && statusCode === 500) {
    console.error('Unhandled Error:', err);
  }

  return sendError(
    res,
    statusCode,
    message,
    config.nodeEnv === 'development' && statusCode === 500 ? [err.stack] : errors
  );
};
