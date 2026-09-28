import React from 'react';
import { useGallery } from '../../context/GalleryContext';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useKeyboard } from '../../hooks/useKeyboard';
import { GalleryControls } from './GalleryControls';
import { GalleryCounter } from './GalleryCounter';

interface LightboxProps {
  images: string[];
}

export const Lightbox: React.FC<LightboxProps> = ({ images }) => {
  const {
    isLightboxOpen,
    closeLightbox,
    selectedImageIndex,
    nextImage,
    prevImage,
  } = useGallery();

  const total = images?.length || 0;

  useLockBodyScroll(isLightboxOpen);

  useKeyboard(
    {
      ArrowLeft: () => prevImage(total),
      ArrowRight: () => nextImage(total),
      Escape: closeLightbox,
    },
    isLightboxOpen
  );

  if (!isLightboxOpen || total === 0) return null;

  const currentSrc = images[selectedImageIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn select-none">
      {/* Top Bar with Counter */}
      <div className="w-full flex items-center justify-between z-50">
        <GalleryControls
          onPrev={() => prevImage(total)}
          onNext={() => nextImage(total)}
          onClose={closeLightbox}
          showNav={false}
        />
        <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <GalleryCounter current={selectedImageIndex + 1} total={total} />
        </div>
      </div>

      {/* Main Image View */}
      <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-4 overflow-hidden">
        <img
          key={selectedImageIndex}
          src={currentSrc}
          alt={`Photo ${selectedImageIndex + 1} of ${total}`}
          className="max-h-[82vh] max-w-full object-contain rounded-lg shadow-2xl transition-opacity duration-200"
        />
      </div>

      {/* Nav Controls Left/Right */}
      <GalleryControls
        onPrev={() => prevImage(total)}
        onNext={() => nextImage(total)}
        onClose={closeLightbox}
        showNav={true}
      />
    </div>
  );
};
