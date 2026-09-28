import React from 'react';
import { X, Share, Heart } from 'lucide-react';
import { useGallery } from '../../context/GalleryContext';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useKeyboard } from '../../hooks/useKeyboard';

interface PhotoTourProps {
  images: string[];
  title: string;
}

export const PhotoTour: React.FC<PhotoTourProps> = ({ images, title }) => {
  const { isPhotoTourOpen, closePhotoTour, openLightbox } = useGallery();

  useLockBodyScroll(isPhotoTourOpen);
  useKeyboard({ Escape: closePhotoTour }, isPhotoTourOpen);

  if (!isPhotoTourOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-fadeIn">
      {/* Sticky Header Bar */}
      <header className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-20">
        <button
          onClick={closePhotoTour}
          className="p-2 hover:bg-gray-100 rounded-full transition flex items-center gap-2 text-sm font-semibold text-gray-800"
          aria-label="Close photo tour"
        >
          <X size={20} />
        </button>

        <h2 className="text-base font-semibold text-gray-900 hidden sm:block truncate max-w-md">
          {title}
        </h2>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition text-gray-700">
            <Share size={18} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition text-gray-700">
            <Heart size={18} />
          </button>
        </div>
      </header>

      {/* Main Image Grid Stream */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="cursor-pointer group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200"
            onClick={() => openLightbox(index)}
          >
            <img
              src={img}
              alt={`${title} - Photo ${index + 1}`}
              className="w-full h-auto object-cover max-h-[650px]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Photo {index + 1} of {images.length}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};
