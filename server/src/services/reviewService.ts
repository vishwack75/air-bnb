import { reviewRepository } from '../repositories/reviewRepository';
import { listingRepository } from '../repositories/listingRepository';
import { userRepository } from '../repositories/userRepository';
import { CreateReviewInput } from '../validators/reviewValidator';
import { ApiError } from '../utils/apiError';

export class ReviewService {
  async getListingReviews(listingId: string) {
    const listing = await listingRepository.findById(listingId);
    if (!listing) {
      throw new ApiError(404, 'Listing not found');
    }
    return reviewRepository.findByListingId(listingId);
  }

  async createReview(listingId: string, input: CreateReviewInput, userId?: string) {
    const listing = await listingRepository.findById(listingId);
    if (!listing) {
      throw new ApiError(404, 'Listing not found');
    }

    let authorName = input.authorName || 'Guest Reviewer';
    let authorAvatar = input.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';

    if (userId) {
      const user = await userRepository.findById(userId);
      if (user) {
        authorName = user.name;
        if (user.avatar) authorAvatar = user.avatar;
      }
    }

    const review = await reviewRepository.create({
      listing: listingId,
      user: userId,
      authorName,
      authorAvatar,
      rating: input.rating,
      comment: input.comment,
    });

    const { avgRating, count } = await reviewRepository.getAverageRatingAndCount(listingId);
    await listingRepository.updateRatingAndCount(listingId, avgRating, count);

    return review;
  }

  async deleteReview(reviewId: string) {
    const review = await reviewRepository.findById(reviewId);
    if (!review) {
      throw new ApiError(404, 'Review not found');
    }

    const listingId = review.listing.toString();
    await reviewRepository.delete(reviewId);

    const { avgRating, count } = await reviewRepository.getAverageRatingAndCount(listingId);
    await listingRepository.updateRatingAndCount(listingId, avgRating, count);

    return { message: 'Review deleted successfully' };
  }
}

export const reviewService = new ReviewService();
