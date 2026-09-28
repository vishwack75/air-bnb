import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { ReviewCard } from './ReviewCard';
import { useReviews } from '../hooks/useReviews';
import { Button } from '../../../components/common/Button';

interface ReviewSectionProps {
  listingId: string;
  rating: number;
  reviewCount: number;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ listingId, rating, reviewCount }) => {
  const { reviews, isLoading, addReview, isSubmitting } = useReviews(listingId);
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [authorName, setAuthorName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await addReview({
      rating: userRating,
      comment: comment.trim(),
      authorName: authorName.trim() || 'Guest Reviewer',
    });

    setComment('');
    setShowAddForm(false);
  };

  return (
    <div id="reviews" className="py-10 border-b border-gray-200">
      {/* Overall Header */}
      <div className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-900 mb-8">
        <Star size={22} className="fill-current text-black" />
        <span>{rating.toFixed(2)} · {reviewCount} reviews</span>
      </div>

      {/* Review Category Breakdown Ratings */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 py-6 border-y border-gray-100 text-sm mb-8">
        <div>
          <p className="font-semibold text-gray-900">Cleanliness</p>
          <p className="text-gray-500 font-medium text-xs mt-1">4.9 ★</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Accuracy</p>
          <p className="text-gray-500 font-medium text-xs mt-1">5.0 ★</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Check-in</p>
          <p className="text-gray-500 font-medium text-xs mt-1">4.9 ★</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Communication</p>
          <p className="text-gray-500 font-medium text-xs mt-1">5.0 ★</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Location</p>
          <p className="text-gray-500 font-medium text-xs mt-1">4.8 ★</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Value</p>
          <p className="text-gray-500 font-medium text-xs mt-1">4.9 ★</p>
        </div>
      </div>

      {/* Reviews Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-28 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-28 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <ReviewCard key={rev._id} review={rev} />
          ))}
        </div>
      )}

      {/* Add Review Action */}
      <div className="mt-8">
        {!showAddForm ? (
          <Button variant="outline" onClick={() => setShowAddForm(true)}>
            Write a review
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 max-w-xl space-y-4">
            <h3 className="font-semibold text-gray-900">Leave a Review</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Rating</label>
              <select
                value={userRating}
                onChange={(e) => setUserRating(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
              >
                <option value={5}>5 ★ - Exceptional</option>
                <option value={4}>4 ★ - Very Good</option>
                <option value={3}>3 ★ - Average</option>
                <option value={2}>2 ★ - Poor</option>
                <option value={1}>1 ★ - Terrible</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Share your stay experience..."
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Posting...' : 'Submit Review'}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
