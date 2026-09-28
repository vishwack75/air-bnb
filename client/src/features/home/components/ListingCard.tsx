import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import type { Listing } from '../../listing/types/listing.types';
import { formatPriceINR } from '../../../utils/formatPrice';
import { getListingCardTitle, isGuestFavourite } from '../../../utils/listingDisplay';
import { cn } from '../../../utils/cn';

interface ListingCardProps {
  listing: Listing;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, isSaved, onToggleSave }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = listing.images.length > 0 ? listing.images : [''];
  const showFavourite = isGuestFavourite(listing);

  return (
    <article className="w-[280px] shrink-0 snap-start">
      <div className="relative aspect-square rounded-xl overflow-hidden group">
        <Link to={`/listings/${listing._id}`} className="block w-full h-full">
          <img
            src={images[imageIndex]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {showFavourite && (
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-xs font-semibold text-gray-900 px-3 py-1.5 rounded-full shadow-sm">
            Guest favourite
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onToggleSave(listing._id);
          }}
          className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform"
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            size={22}
            strokeWidth={2}
            className={cn(
              'drop-shadow-md',
              isSaved ? 'fill-airbnb-red text-airbnb-red' : 'fill-black/40 text-white stroke-white'
            )}
          />
        </button>

        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
            {images.slice(0, 5).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setImageIndex(i);
                }}
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition',
                  i === imageIndex ? 'bg-white scale-110' : 'bg-white/60'
                )}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <Link to={`/listings/${listing._id}`} className="block mt-3 space-y-0.5">
        <h3 className="font-semibold text-[15px] text-gray-900 truncate">
          {getListingCardTitle(listing)}
        </h3>
        <p className="text-[15px] text-gray-900">
          <span className="font-semibold">{formatPriceINR(listing.pricePerNight)}</span>
          <span className="text-gray-600"> for 2 nights</span>
          <span className="text-gray-600 mx-1">·</span>
          <Star size={12} className="inline -mt-0.5 fill-gray-900 text-gray-900" />
          <span className="font-medium"> {listing.rating.toFixed(2)}</span>
        </p>
      </Link>
    </article>
  );
};
