import React from 'react';
import { GalleryImage } from './GalleryImage';

interface PhotoGridProps {
  images: string[];
  onImageClick: (index: number) => void;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ images, onImageClick }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden h-[300px] sm:h-[400px] md:h-[450px]">
      <GalleryImage
        src={images[0]}
        alt="Listing main photo"
        className="md:col-span-2 h-full"
        onClick={() => onImageClick(0)}
      />
      <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
        {images.slice(1, 5).map((img, idx) => (
          <GalleryImage
            key={idx}
            src={img}
            alt={`Listing photo ${idx + 2}`}
            className="h-full"
            onClick={() => onImageClick(idx + 1)}
          />
        ))}
      </div>
    </div>
  );
};
