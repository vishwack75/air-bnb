import mongoose, { Schema, Document } from 'mongoose';
import { IReview } from '../types';

export interface ReviewDocument extends Omit<IReview, '_id'>, Document {}

const ReviewSchema = new Schema<ReviewDocument>(
  {
    listing: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorAvatar: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.model<ReviewDocument>('Review', ReviewSchema);
