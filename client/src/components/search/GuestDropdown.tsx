import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface GuestDropdownProps {
  isOpen: boolean;
  guests: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
  updateGuestCount: (type: 'adults' | 'children' | 'infants' | 'pets', value: number) => void;
}

export const GuestDropdown: React.FC<GuestDropdownProps> = ({ isOpen, guests, updateGuestCount }) => {
  if (!isOpen) return null;

  const GuestRow = ({ 
    type, 
    title, 
    subtitle, 
    value, 
    min = 0, 
    max = 16 
  }: { 
    type: 'adults' | 'children' | 'infants' | 'pets'; 
    title: string; 
    subtitle: string; 
    value: number;
    min?: number;
    max?: number;
  }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div>
        <h4 className="font-semibold text-gray-900 text-base">{title}</h4>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => updateGuestCount(type, Math.max(min, value - 1))}
          disabled={value <= min}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition
            ${value <= min ? 'border-gray-200 text-gray-200 cursor-not-allowed' : 'border-gray-400 text-gray-600 hover:border-black hover:text-black'}`}
        >
          <Minus size={14} strokeWidth={3} />
        </button>
        <span className="w-4 text-center font-medium text-gray-900">{value}</span>
        <button
          onClick={() => updateGuestCount(type, Math.min(max, value + 1))}
          disabled={value >= max}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition
            ${value >= max ? 'border-gray-200 text-gray-200 cursor-not-allowed' : 'border-gray-400 text-gray-600 hover:border-black hover:text-black'}`}
        >
          <Plus size={14} strokeWidth={3} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="absolute top-full right-0 mt-4 w-96 bg-white rounded-3xl shadow-[0_8px_28px_rgba(0,0,0,0.28)] py-4 px-8 z-50 animate-scaleUp border border-gray-200">
      <GuestRow type="adults" title="Adults" subtitle="Ages 13 or above" value={guests.adults} min={1} />
      <GuestRow type="children" title="Children" subtitle="Ages 2-12" value={guests.children} />
      <GuestRow type="infants" title="Infants" subtitle="Under 2" value={guests.infants} />
      <GuestRow type="pets" title="Pets" subtitle="Bringing a service animal?" value={guests.pets} />
    </div>
  );
};
