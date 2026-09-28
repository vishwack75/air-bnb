import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { useGallery } from '../../context/GalleryContext';

interface HeroGalleryProps {
  images: string[];
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({ images }) => {
  const { openPhotoTour, openLightbox } = useGallery();

  const mainImage = images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80';
  const gridImages = images.slice(1, 5);

  return (
    <div className="relative mt-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden h-[300px] sm:h-[400px] md:h-[450px]">
        {/* Main Large Image (Left half) */}
        <div
          className="md:col-span-2 relative cursor-pointer overflow-hidden group h-full"
          onClick={() => openLightbox(0)}
        >
          <img
            src={mainImage}
            alt="Listing main view"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
        </div>

        {/* 4 Stacked Grid Images (Right half) */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
          {gridImages.map((img, idx) => {
            const actualIndex = idx + 1;
            return (
              <div
                key={idx}
                className="relative cursor-pointer overflow-hidden group h-full"
                onClick={() => openLightbox(actualIndex)}
              >
                <img
                  src={img}
                  alt={`Listing view ${actualIndex + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
              </div>
            );
          })}
        </div>
      </div>

      {/* "Show all photos" floating button */}
      <button
        onClick={() => openPhotoTour(0)}
        className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-gray-900 font-semibold text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 rounded-md border border-black shadow-md flex items-center gap-2 transition duration-150 active:scale-95 z-10"
      >
        <LayoutGrid size={16} />
        <span>Show all photos</span>
      </button>
    </div>
  );
};
