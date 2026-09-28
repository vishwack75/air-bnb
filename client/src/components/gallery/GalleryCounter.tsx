import React from 'react';

interface GalleryCounterProps {
  current: number;
  total: number;
}

export const GalleryCounter: React.FC<GalleryCounterProps> = ({ current, total }) => {
  return (
    <div className="text-white/80 font-medium text-sm tracking-wide bg-black/40 px-3 py-1 rounded-full border border-white/10">
      {current} / {total}
    </div>
  );
};
