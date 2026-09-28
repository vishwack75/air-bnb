import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { sendResponse } from '../utils/apiResponse';
import { setAuthCookie, clearAuthCookie } from '../utils/jwt';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../types';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  setAuthCookie(res, result.token);
  return sendResponse(res, 201, result, 'User registered successfully');
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  setAuthCookie(res, result.token);
  return sendResponse(res, 200, result, 'Logged in successfully');
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  clearAuthCookie(res);
  return sendResponse(res, 200, null, 'Logged out successfully');
});

export const getMe = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const user = await authService.getMe(userId);
  return sendResponse(res, 200, user);
});
