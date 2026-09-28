import React from 'react';
import { ShieldCheck, DoorOpen, Calendar } from 'lucide-react';
import type { Listing } from '../types/listing.types';

interface ListingInfoProps {
  listing: Listing;
}

export const ListingInfo: React.FC<ListingInfoProps> = ({ listing }) => {
  return (
    <div className="py-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {listing.propertyType} hosted by {listing.host?.name || 'Eleanor'}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {listing.guests} guests · {listing.bedrooms} bedrooms · {listing.beds} beds · {listing.bathrooms} baths
          </p>
        </div>
        <img
          src={listing.host?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
          alt={listing.host?.name}
          className="w-14 h-14 rounded-full object-cover border border-gray-200 shadow-xs"
        />
      </div>

      {/* Highlights */}
      <div className="mt-6 space-y-6">
        <div className="flex gap-4 items-start">
          <ShieldCheck size={24} className="text-gray-800 shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 text-base">Dedicated workspace</h3>
            <p className="text-sm text-gray-500">A common area with wifi that's well-suited for working.</p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <DoorOpen size={24} className="text-gray-800 shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 text-base">Self check-in</h3>
            <p className="text-sm text-gray-500">Check yourself in with the keypad smart lock.</p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <Calendar size={24} className="text-gray-800 shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 text-base">Free cancellation for 48 hours</h3>
            <p className="text-sm text-gray-500">Get a full refund if you change your mind.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
