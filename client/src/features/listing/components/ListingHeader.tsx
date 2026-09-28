import React, { useState } from 'react';
import { Star, Share, Heart } from 'lucide-react';
import type { Listing } from '../types/listing.types';

interface ListingHeaderProps {
  listing: Listing;
}

export const ListingHeader: React.FC<ListingHeaderProps> = ({ listing }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-6 pb-4">
      <h1 className="text-2xl sm:text-[26px] font-semibold text-gray-900 tracking-tight leading-snug">
        {listing.title}
      </h1>

      <div className="mt-2 flex flex-wrap items-center justify-between text-sm gap-2">
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-gray-900">
          <span className="flex items-center gap-1 font-semibold">
            <Star size={14} className="fill-current text-black" />
            {listing.rating.toFixed(2)}
          </span>
          <span>·</span>
          <a href="#reviews" className="underline font-semibold hover:text-black">
            {listing.reviewCount} reviews
          </a>
          <span>·</span>
          <span className="font-medium underline hover:text-black cursor-pointer">
            {listing.location}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 py-1.5 px-3 rounded-md hover:bg-gray-100 transition font-medium text-gray-800 text-sm underline"
          >
            <Share size={15} />
            <span>{copied ? 'Copied link!' : 'Share'}</span>
          </button>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="flex items-center gap-2 py-1.5 px-3 rounded-md hover:bg-gray-100 transition font-medium text-gray-800 text-sm underline"
          >
            <Heart size={15} className={isSaved ? 'fill-airbnb-red text-airbnb-red' : ''} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
