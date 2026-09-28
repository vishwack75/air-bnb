import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ListingCard } from './ListingCard';
import type { Listing } from '../../features/listing/types/listing.types';

interface ListingCarouselSectionProps {
  title: string;
  listings: Listing[];
}

export const ListingCarouselSection: React.FC<ListingCarouselSectionProps> = ({ title, listings }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-1 cursor-pointer hover:opacity-80 transition">
          <span>{title}</span>
          <ChevronRight size={22} className="mt-0.5" />
        </h2>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full border border-gray-300 hover:border-black hover:shadow-sm transition active:scale-95 text-gray-800"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-gray-300 hover:border-black hover:shadow-sm transition active:scale-95 text-gray-800"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Cards Row */}
      <div
        ref={scrollRef}
        className="flex items-center gap-6 overflow-x-auto scrollbar-none py-2 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </section>
  );
};
