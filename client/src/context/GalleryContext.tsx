import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface GalleryContextType {
  isPhotoTourOpen: boolean;
  isLightboxOpen: boolean;
  selectedImageIndex: number;
  openPhotoTour: (index?: number) => void;
  closePhotoTour: () => void;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  nextImage: (totalImages: number) => void;
  prevImage: (totalImages: number) => void;
  setSelectedImageIndex: (index: number) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openPhotoTour = useCallback((index = 0) => {
    setSelectedImageIndex(index);
    setIsPhotoTourOpen(true);
    setIsLightboxOpen(false);
  }, []);

  const closePhotoTour = useCallback(() => {
    setIsPhotoTourOpen(false);
  }, []);

  const openLightbox = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const nextImage = useCallback((totalImages: number) => {
    setSelectedImageIndex((prev) => (prev + 1) % totalImages);
  }, []);

  const prevImage = useCallback((totalImages: number) => {
    setSelectedImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, []);

  // Prevent background body scrolling when modal/lightbox is open
  useEffect(() => {
    if (isPhotoTourOpen || isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPhotoTourOpen, isLightboxOpen]);

  return (
    <GalleryContext.Provider
      value={{
        isPhotoTourOpen,
        isLightboxOpen,
        selectedImageIndex,
        openPhotoTour,
        closePhotoTour,
        openLightbox,
        closeLightbox,
        nextImage,
        prevImage,
        setSelectedImageIndex,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};
