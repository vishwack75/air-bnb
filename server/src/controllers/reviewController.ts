import { Response } from 'express';
import { reviewService } from '../services/reviewService';
import { sendResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../types';

export const getListingReviews = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const reviews = await reviewService.getListingReviews(req.params.id);
  return sendResponse(res, 200, reviews);
});

export const createReview = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const listingId = req.params.id;
  const userId = req.user?.id;
  const review = await reviewService.createReview(listingId, req.body, userId);
  return sendResponse(res, 201, review, 'Review created successfully');
});

export const deleteReview = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const reviewId = req.params.id;
  await reviewService.deleteReview(reviewId);
  return sendResponse(res, 200, null, 'Review deleted successfully');
});
