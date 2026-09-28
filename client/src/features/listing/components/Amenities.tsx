import React, { useState } from 'react';
import {
  Wifi,
  Mountain,
  Sun,
  Laptop,
  Car,
  Bath,
  Utensils,
  Flame,
  Tv,
  Wind,
  Shirt,
  Zap,
  Key,
  CheckCircle2,
} from 'lucide-react';
import type { Amenity } from '../types/listing.types';
import { Modal } from '../../../components/common/Modal';

const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi size={20} />,
  Mountain: <Mountain size={20} />,
  Sun: <Sun size={20} />,
  Laptop: <Laptop size={20} />,
  Car: <Car size={20} />,
  Bath: <Bath size={20} />,
  Utensils: <Utensils size={20} />,
  Flame: <Flame size={20} />,
  Tv: <Tv size={20} />,
  Wind: <Wind size={20} />,
  Shirt: <Shirt size={20} />,
  Zap: <Zap size={20} />,
  Key: <Key size={20} />,
};

interface AmenitiesProps {
  amenities: Amenity[];
}

export const Amenities: React.FC<AmenitiesProps> = ({ amenities }) => {
  const [isOpen, setIsOpen] = useState(false);

  const visibleAmenities = amenities.slice(0, 10);

  return (
    <div className="py-8 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">What this place offers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visibleAmenities.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 text-gray-800 py-1">
            <span className="text-gray-700">
              {iconMap[item.icon] || <CheckCircle2 size={20} />}
            </span>
            <span className="text-sm sm:text-base font-normal">{item.name}</span>
          </div>
        ))}
      </div>

      {amenities.length > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          className="mt-8 border border-black hover:bg-gray-100 font-semibold text-sm py-3 px-6 rounded-lg transition active:scale-95"
        >
          Show all {amenities.length} amenities
        </button>
      )}

      {/* Amenities Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="What this place offers">
        <div className="space-y-6">
          {amenities.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
              <span className="text-gray-800 mt-0.5">
                {iconMap[item.icon] || <CheckCircle2 size={22} />}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                {item.description && <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};
