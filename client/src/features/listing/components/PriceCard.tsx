import React, { useState } from 'react';
import { Star, ChevronDown, Flag } from 'lucide-react';
import type { Listing } from '../types/listing.types';
import { formatPrice } from '../../../utils/formatPrice';

interface PriceCardProps {
  listing: Listing;
}

export const PriceCard: React.FC<PriceCardProps> = ({ listing }) => {
  const [nights, setNights] = useState(5);
  const [guests, setGuests] = useState(2);
  const [isReserved, setIsReserved] = useState(false);

  const baseTotal = listing.pricePerNight * nights;
  const grandTotal = baseTotal + listing.cleaningFee + listing.serviceFee;

  return (
    <div className="sticky top-28 bg-white border border-gray-300 rounded-2xl p-6 shadow-stickyCard space-y-6">
      {/* Price Header */}
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(listing.pricePerNight)}
          </span>
          <span className="text-gray-600 text-sm font-normal"> / night</span>
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold">
          <Star size={14} className="fill-current text-black" />
          <span>{listing.rating.toFixed(2)}</span>
          <span className="text-gray-500 font-normal">({listing.reviewCount})</span>
        </div>
      </div>

      {/* Date & Guest Input Form Container */}
      <div className="border border-gray-400 rounded-xl overflow-hidden divide-y divide-gray-400 text-xs font-semibold">
        <div className="grid grid-cols-2 divide-x divide-gray-400">
          <div className="p-3 bg-white hover:bg-gray-50 cursor-pointer">
            <label className="block text-[10px] uppercase text-gray-800 tracking-wider">CHECK-IN</label>
            <span className="text-sm font-normal text-gray-800">10/12/2026</span>
          </div>
          <div className="p-3 bg-white hover:bg-gray-50 cursor-pointer">
            <label className="block text-[10px] uppercase text-gray-800 tracking-wider">CHECKOUT</label>
            <span className="text-sm font-normal text-gray-800">10/17/2026</span>
          </div>
        </div>

        <div className="p-3 bg-white hover:bg-gray-50 cursor-pointer flex items-center justify-between">
          <div>
            <label className="block text-[10px] uppercase text-gray-800 tracking-wider">GUESTS</label>
            <span className="text-sm font-normal text-gray-800">{guests} guests</span>
          </div>
          <ChevronDown size={18} className="text-gray-700" />
        </div>
      </div>

      {/* Reserve Button */}
      <button
        onClick={() => setIsReserved(true)}
        className="w-full bg-airbnb-red hover:bg-airbnb-darkRed text-white font-semibold py-3.5 px-4 rounded-xl text-base shadow-sm transition active:scale-98"
      >
        {isReserved ? 'Reserved! (Demo)' : 'Reserve'}
      </button>

      <p className="text-center text-xs text-gray-500 font-medium">You won't be charged yet</p>

      {/* Pricing Breakdown */}
      <div className="space-y-3 pt-4 border-t border-gray-200 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="underline">{formatPrice(listing.pricePerNight)} x {nights} nights</span>
          <span>{formatPrice(baseTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="underline">Cleaning fee</span>
          <span>{formatPrice(listing.cleaningFee)}</span>
        </div>
        <div className="flex justify-between">
          <span className="underline">Airbnb service fee</span>
          <span>{formatPrice(listing.serviceFee)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="pt-4 border-t border-gray-200 flex justify-between items-center font-bold text-base text-gray-900">
        <span>Total before taxes</span>
        <span>{formatPrice(grandTotal)}</span>
      </div>

      <div className="pt-2 text-center">
        <button className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1 mx-auto underline">
          <Flag size={12} />
          Report this listing
        </button>
      </div>
    </div>
  );
};
