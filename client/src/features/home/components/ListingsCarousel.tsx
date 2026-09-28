import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronRight as SectionArrow } from 'lucide-react';
import type { Listing } from '../../listing/types/listing.types';
import { ListingCard } from './ListingCard';
import { Skeleton } from '../../../components/common/Skeleton';
import { IconButton } from '../../../components/common/IconButton';

interface ListingsCarouselProps {
  title: string;
  listings: Listing[];
  isLoading: boolean;
  isError: boolean;
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
}

export const ListingsCarousel: React.FC<ListingsCarouselProps> = ({
  title,
  listings,
  isLoading,
  isError,
  isSaved,
  onToggleSave,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -el.clientWidth * 0.85 : el.clientWidth * 0.85;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="py-6">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            className="flex items-center gap-1 text-xl font-semibold text-gray-900 hover:underline group"
          >
            {title}
            <SectionArrow size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {!isLoading && listings.length > 0 && (
            <div className="hidden sm:flex items-center gap-2">
              <IconButton
                onClick={() => scroll('left')}
                ariaLabel="Scroll left"
                icon={<ChevronLeft size={16} />}
                className="border border-gray-300 w-8 h-8"
              />
              <IconButton
                onClick={() => scroll('right')}
                ariaLabel="Scroll right"
                icon={<ChevronRight size={16} />}
                className="border border-gray-300 w-8 h-8"
              />
            </div>
          )}
        </div>

        {isLoading && (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-[280px] h-[320px] shrink-0 rounded-xl" />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-gray-600 text-sm py-8">
            Could not load listings. Make sure the backend is running and run{' '}
            <code className="bg-gray-100 px-1 rounded">npm run seed</code> in the server folder.
          </p>
        )}

        {!isLoading && !isError && listings.length === 0 && (
          <p className="text-gray-600 text-sm py-8">No places found for this search. Try another city.</p>
        )}

        {!isLoading && listings.length > 0 && (
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {listings.map((listing) => (
              <ListingCard
                key={listing._id}
                listing={listing}
                isSaved={isSaved(listing._id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
