import React from 'react';
import { MapPin } from 'lucide-react';
import { useCities } from '../../features/listing/hooks/useCities';

interface DestinationDropdownProps {
  isOpen: boolean;
  onSelect: (city: string) => void;
  searchQuery: string;
}

export const DestinationDropdown: React.FC<DestinationDropdownProps> = ({ isOpen, onSelect, searchQuery }) => {
  const { data: cities = [], isLoading } = useCities();

  if (!isOpen) return null;

  const filteredCities = cities.filter(c => 
    c.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="absolute top-full left-0 mt-4 w-96 bg-white rounded-3xl shadow-[0_8px_28px_rgba(0,0,0,0.28)] py-6 px-2 z-50 animate-scaleUp border border-gray-200">
      <h3 className="px-6 text-sm font-bold text-gray-900 mb-4">Suggested destinations</h3>
      
      {isLoading ? (
        <div className="px-6 py-4 text-sm text-gray-500">Loading destinations...</div>
      ) : filteredCities.length === 0 ? (
        <div className="px-6 py-4 text-sm text-gray-500">No destinations found</div>
      ) : (
        <div className="max-h-[300px] overflow-y-auto">
          {filteredCities.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelect(item.city)}
              className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100 cursor-pointer rounded-xl transition"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 shrink-0">
                <MapPin size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 text-base">
                  {item.city}, {item.country}
                </span>
                <span className="text-sm text-gray-500">
                  {item.count} {item.count === 1 ? 'property' : 'properties'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
