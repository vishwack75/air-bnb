import React from 'react';
import { Award, Star, ShieldCheck } from 'lucide-react';
import type { Host } from '../types/listing.types';

interface HostSectionProps {
  host: Host;
}

export const HostSection: React.FC<HostSectionProps> = ({ host }) => {
  return (
    <div className="py-8 border-b border-gray-200">
      <div className="bg-airbnb-bgGray p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-4">
          <img
            src={host.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={host.name}
            className="w-16 h-16 rounded-full object-cover shadow-sm"
          />
          <div>
            <h3 className="text-lg font-bold text-gray-900">Hosted by {host.name}</h3>
            <p className="text-sm text-gray-500">{host.joinedDate || 'Superhost · 7 years hosting'}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 font-medium text-gray-800">
            <Award className="text-airbnb-red" size={20} />
            <span>Superhost</span>
          </div>
          <div className="flex items-center gap-2 font-medium text-gray-800">
            <Star className="fill-current text-black" size={18} />
            <span>{host.responseRate || 100}% Response rate</span>
          </div>
          <div className="flex items-center gap-2 font-medium text-gray-800">
            <ShieldCheck className="text-gray-700" size={20} />
            <span>Identity verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
