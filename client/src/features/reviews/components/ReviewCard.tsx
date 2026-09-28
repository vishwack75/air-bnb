import React from 'react';
import type { Review } from '../types/review.types';
import { Rating } from './Rating';
import { formatDate } from '../../../utils/formatDate';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="p-4 rounded-xl border border-gray-100 bg-white space-y-3 shadow-xs">
      <div className="flex items-center gap-3">
        <img
          src={review.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
          alt={review.authorName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{review.authorName}</h4>
          <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Rating rating={review.rating} size={12} />
      </div>

      <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
    </div>
  );
};
