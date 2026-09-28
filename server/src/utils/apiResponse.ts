import { Response } from 'express';
import { ApiResponse, PaginationMeta } from '../types';

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  data: T,
  message?: string,
  pagination?: PaginationMeta
) => {
  const response: ApiResponse<T> = {
    success: true,
    ...(message && { message }),
    data,
    ...(pagination && { pagination }),
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  errors: any[] = []
) => {
  const response: ApiResponse = {
    success: false,
    message,
    errors,
  };
  return res.status(statusCode).json(response);
};
