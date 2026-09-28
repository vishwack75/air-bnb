import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewApi } from '../services/reviewApi';
import type { CreateReviewInput } from '../types/review.types';

export function useReviews(listingId: string) {
  const queryClient = useQueryClient();

  const reviewsQuery = useQuery({
    queryKey: ['reviews', listingId],
    queryFn: async () => {
      const res = await reviewApi.getListingReviews(listingId);
      return res.data;
    },
    enabled: Boolean(listingId),
  });

  const createReviewMutation = useMutation({
    mutationFn: (data: CreateReviewInput) => reviewApi.createReview(listingId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', listingId] });
      queryClient.invalidateQueries({ queryKey: ['listing', listingId] });
    },
  });

  return {
    reviews: reviewsQuery.data || [],
    isLoading: reviewsQuery.isLoading,
    isError: reviewsQuery.isError,
    addReview: createReviewMutation.mutateAsync,
    isSubmitting: createReviewMutation.isPending,
  };
}
