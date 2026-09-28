import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface DescriptionProps {
  description: string;
}

export const Description: React.FC<DescriptionProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLong = description.length > 350;
  const displayText = !isExpanded && isLong ? `${description.slice(0, 350)}...` : description;

  return (
    <div className="py-6 border-b border-gray-200">
      <div className="text-gray-800 leading-relaxed whitespace-pre-line text-sm sm:text-base">
        {displayText}
      </div>

      {isLong && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-4 flex items-center gap-1 font-semibold text-gray-900 underline hover:opacity-80 transition"
        >
          <span>{isExpanded ? 'Show less' : 'Show more'}</span>
          <ChevronRight size={16} className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
      )}
    </div>
  );
};
