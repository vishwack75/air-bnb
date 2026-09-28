import { Review, ReviewDocument } from '../models/Review';

export class ReviewRepository {
  async findByListingId(listingId: string): Promise<ReviewDocument[]> {
    return Review.find({ listing: listingId }).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<ReviewDocument | null> {
    return Review.findById(id).exec();
  }

  async create(data: {
    listing: string;
    user?: string;
    authorName: string;
    authorAvatar: string;
    rating: number;
    comment: string;
  }): Promise<ReviewDocument> {
    return Review.create(data);
  }

  async delete(id: string): Promise<ReviewDocument | null> {
    return Review.findByIdAndDelete(id).exec();
  }

  async getAverageRatingAndCount(listingId: string): Promise<{ avgRating: number; count: number }> {
    const mongoose = (await import('mongoose')).default;
    const result = await Review.aggregate([
      { $match: { listing: new mongoose.Types.ObjectId(listingId) } },
      {
        $group: {
          _id: '$listing',
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 },
        },
      },
    ]);

    if (result.length === 0) {
      return { avgRating: 0, count: 0 };
    }

    return {
      avgRating: Math.round(result[0].avgRating * 100) / 100,
      count: result[0].count,
    };
  }
}

export const reviewRepository = new ReviewRepository();
