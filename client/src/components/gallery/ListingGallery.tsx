import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { PhotoGrid } from './PhotoGrid';
import { useGallery } from '../../context/GalleryContext';

interface ListingGalleryProps {
  images: string[];
}

export const ListingGallery: React.FC<ListingGalleryProps> = ({ images }) => {
  const { openPhotoTour, openLightbox } = useGallery();

  return (
    <div className="relative mt-2">
      <PhotoGrid images={images} onImageClick={openLightbox} />

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
