import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  max?: number;
  size?: number;
}

export const Rating: React.FC<RatingProps> = ({ rating, max = 5, size = 14 }) => {
  return (
    <div className="flex items-center gap-0.5 text-gray-900">
      {Array.from({ length: max }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={index < Math.floor(rating) ? 'fill-current text-black' : 'text-gray-300'}
        />
      ))}
    </div>
  );
};
