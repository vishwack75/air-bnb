import React from 'react';
import { cn } from '../../utils/cn';

interface GalleryImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export const GalleryImage: React.FC<GalleryImageProps> = ({ src, alt, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn('relative overflow-hidden cursor-pointer group bg-gray-100', className)}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
    </div>
  );
};
