import { apiClient } from '../../../services/apiClient';
import type { Review, CreateReviewInput } from '../types/review.types';
import type { ApiResponse } from '../../../types/api.types';

export const reviewApi = {
  getListingReviews: async (listingId: string): Promise<ApiResponse<Review[]>> => {
    const response = await apiClient.get(`/listings/${listingId}/reviews`);
    return response.data;
  },

  createReview: async (listingId: string, data: CreateReviewInput): Promise<ApiResponse<Review>> => {
    const response = await apiClient.post(`/listings/${listingId}/reviews`, data);
    return response.data;
  },

  deleteReview: async (reviewId: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(`/reviews/${reviewId}`);
    return response.data;
  },
};
