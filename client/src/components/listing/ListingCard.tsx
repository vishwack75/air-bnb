import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { Listing } from '../../features/listing/types/listing.types';
import { formatPrice } from '../../utils/formatPrice';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const navigate = useNavigate();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const images = listing.images?.length > 0 ? listing.images : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  return (
    <div
      onClick={() => navigate(`/listings/${listing._id}`)}
      className="group cursor-pointer flex flex-col space-y-2 select-none w-full max-w-[290px] shrink-0"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={images[currentImgIndex]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
        />

        {/* Guest Favourite Badge */}
        {listing.isGuestFavorite && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-black font-semibold text-[13px] px-3 py-1 rounded-full shadow-sm z-10">
            Guest favourite
          </div>
        )}

        {/* Heart Wishlist Button */}
        <button
          onClick={handleSave}
          className="absolute top-3 right-3 p-1.5 text-white hover:scale-110 transition z-10"
          aria-label="Save to wishlist"
        >
          <Heart
            size={22}
            className={isSaved ? 'fill-airbnb-red text-airbnb-red' : 'fill-black/30 stroke-white stroke-[2]'}
          />
        </button>

        {/* Image Slider Controls (Left & Right Arrows on Hover) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 hover:bg-white text-black rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 hover:bg-white text-black rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Dots Pagination Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {images.slice(0, 5).map((_, idx) => (
              <div
                key={idx}
                className={`rounded-full transition-all duration-200 ${
                  idx === currentImgIndex
                    ? 'w-2 h-2 bg-white'
                    : 'w-1.5 h-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Listing Meta Details */}
      <div className="pt-1">
        <h3 className="font-semibold text-gray-900 text-base truncate">{listing.title}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-800 mt-0.5">
          <span className="font-normal text-gray-600">
            {formatPrice(listing.pricePerNight)} for night
          </span>
          <span>·</span>
          <div className="flex items-center gap-1 font-semibold text-gray-900">
            <Star size={13} className="fill-current text-black" />
            <span>{listing.rating.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
