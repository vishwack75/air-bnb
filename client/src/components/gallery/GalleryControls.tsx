import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { IconButton } from '../common/IconButton';

interface GalleryControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  showNav?: boolean;
}

export const GalleryControls: React.FC<GalleryControlsProps> = ({
  onPrev,
  onNext,
  onClose,
  showNav = true,
}) => {
  return (
    <>
      {/* Close Button Top Left */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 z-50 p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition"
        aria-label="Close"
      >
        <X size={22} />
      </button>

      {/* Navigation Buttons Left / Right */}
      {showNav && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 text-white bg-black/50 hover:bg-black/80 rounded-full transition border border-white/20 active:scale-90"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={onNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 text-white bg-black/50 hover:bg-black/80 rounded-full transition border border-white/20 active:scale-90"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </>
  );
};
