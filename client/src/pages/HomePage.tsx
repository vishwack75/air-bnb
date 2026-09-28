import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { ListingCarouselSection } from '../components/listing/ListingCarouselSection';
import { useListings } from '../features/listing/hooks/useListings';
import { Skeleton } from '../components/common/Skeleton';

export const HomePage: React.FC = () => {
  const { data, isLoading, isError, error } = useListings();

  const listings = data?.listings || [];

  // Group listings dynamically by city
  const groupedByCity = listings.reduce<Record<string, typeof listings>>((acc, listing) => {
    const cityName = listing.city || 'Featured Places';
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(listing);
    return acc;
  }, {});

  const cityEntries = Object.entries(groupedByCity);

  if (isLoading) {
    return (
      <PageContainer className="py-8 space-y-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <div className="flex gap-6 overflow-hidden">
          <Skeleton className="h-[280px] w-[280px] rounded-2xl shrink-0" />
          <Skeleton className="h-[280px] w-[280px] rounded-2xl shrink-0" />
          <Skeleton className="h-[280px] w-[280px] rounded-2xl shrink-0" />
          <Skeleton className="h-[280px] w-[280px] rounded-2xl shrink-0" />
        </div>
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer className="py-16 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Unable to load places</h2>
          <p className="text-gray-600 text-sm">
            {(error as Error)?.message || 'Make sure the backend server is running and database is seeded.'}
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

  return (
    <PageContainer className="py-6 space-y-8">
      {cityEntries.map(([cityName, cityListings]) => (
        <ListingCarouselSection
          key={cityName}
          title={`Places to stay in ${cityName}`}
          listings={cityListings}
        />
      ))}
    </PageContainer>
  );
};
