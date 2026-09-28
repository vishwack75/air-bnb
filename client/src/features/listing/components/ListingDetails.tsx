import React from 'react';

interface ListingDetailsProps {
  description: string;
}

export const ListingDetails: React.FC<ListingDetailsProps> = ({ description }) => {
  return (
    <div className="py-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">About this space</h2>
      <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
        {description}
      </div>
    </div>
  );
};
