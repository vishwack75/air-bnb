import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { listingApi } from '../features/listing/services/listingApi';
import { PageContainer } from '../components/layout/PageContainer';
import { ListingHeader } from '../features/listing/components/ListingHeader';
import { ListingGallery } from '../components/gallery/ListingGallery';
import { ListingInfo } from '../features/listing/components/ListingInfo';
import { Description } from '../features/listing/components/Description';
import { Amenities } from '../features/listing/components/Amenities';
import { HostSection } from '../features/listing/components/HostSection';
import { PriceCard } from '../features/listing/components/PriceCard';
import { ReviewSection } from '../features/reviews/components/ReviewSection';
import { PhotoTour } from '../components/gallery/PhotoTour';
import { Lightbox } from '../components/gallery/Lightbox';
import { Skeleton } from '../components/common/Skeleton';

export const ListingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // If specific ID is provided use it, otherwise fetch first available listing
  const { data: listingData, isLoading, isError, error } = useQuery({
    queryKey: ['listing-page', id],
    queryFn: async () => {
      if (id) {
        const res = await listingApi.getListingById(id);
        return res.data;
      } else {
        const res = await listingApi.getListings({ limit: 1 });
        if (res.data && res.data.length > 0) {
          return res.data[0];
        }
        throw new Error('No listings found in database. Please run npm run seed.');
      }
    },
  });

  if (isLoading) {
    return (
      <PageContainer className="py-8 space-y-6">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-[450px] w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </PageContainer>
    );
  }

  if (isError || !listingData) {
    return (
      <PageContainer className="py-16 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Listing unavailable</h2>
          <p className="text-gray-600 text-sm">
            {(error as Error)?.message || 'Could not load listing details. Please ensure the backend server is running and database is seeded.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-airbnb-red text-white font-semibold rounded-lg shadow-sm hover:bg-airbnb-darkRed transition"
          >
            Retry Connection
          </button>
        </div>
      </PageContainer>
    );
  }

  const listing = listingData;

  return (
    <PageContainer>
      {/* Listing Header */}
      <ListingHeader listing={listing} />

      {/* Hero Photo Gallery */}
      <ListingGallery images={listing.images} />

      {/* Main Content Layout (Desktop Responsive: 2 Columns on Desktop/Tablet, 1 Column on Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
        {/* Left Column: Property Details */}
        <div className="lg:col-span-2">
          <ListingInfo listing={listing} />
          <Description description={listing.description} />
          <Amenities amenities={listing.amenities} />
          <ReviewSection
            listingId={listing._id}
            rating={listing.rating}
            reviewCount={listing.reviewCount}
          />
          <HostSection host={listing.host} />
        </div>

        {/* Right Column: Sticky Pricing Card */}
        <div className="lg:col-span-1">
          <PriceCard listing={listing} />
        </div>
      </div>

      {/* Gallery Modals */}
      <PhotoTour images={listing.images} title={listing.title} />
      <Lightbox images={listing.images} />
    </PageContainer>
  );
};
