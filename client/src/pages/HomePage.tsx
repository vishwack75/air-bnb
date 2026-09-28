import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar, type SearchFilters } from '../features/home/components/SearchBar';
import { ListingsCarousel } from '../features/home/components/ListingsCarousel';
import { useListings } from '../features/listing/hooks/useListings';
import { useFavorites } from '../hooks/useFavorites';
import type { ListingQueryParams } from '../features/listing/types/listing.types';

const DEFAULT_CITY = 'Pune';
const DEFAULT_DATES = '7 Jul - 18 Jul';

export const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites();

  const appliedCity = searchParams.get('city') || DEFAULT_CITY;
  const appliedGuests = searchParams.get('guests')
    ? Number(searchParams.get('guests'))
    : undefined;

  const [draft, setDraft] = useState<SearchFilters>({
    city: appliedCity,
    dateLabel: DEFAULT_DATES,
    guests: appliedGuests,
  });

  const queryParams = useMemo((): ListingQueryParams => {
    const params: ListingQueryParams = {
      city: appliedCity,
      limit: 20,
      sort: 'rating_desc',
    };
    if (appliedGuests && appliedGuests > 0) {
      params.guests = appliedGuests;
    }
    return params;
  }, [appliedCity, appliedGuests]);

  const { data, isLoading, isError } = useListings(queryParams);

  const handleSearch = () => {
    const next = new URLSearchParams();
    const city = draft.city.trim() || DEFAULT_CITY;
    next.set('city', city);
    if (draft.guests && draft.guests > 0) {
      next.set('guests', String(draft.guests));
    }
    setSearchParams(next, { replace: true });
  };

  const sectionTitle = `Places to stay in ${appliedCity}`;

  return (
    <div className="pb-8">
      <div className="border-b border-gray-100 pb-6 pt-2">
        <div className="max-w-[1280px] mx-auto px-6">
          <SearchBar filters={draft} onChange={setDraft} onSearch={handleSearch} />
        </div>
      </div>

      <ListingsCarousel
        title={sectionTitle}
        listings={data?.listings ?? []}
        isLoading={isLoading}
        isError={isError}
        isSaved={isFavorite}
        onToggleSave={toggleFavorite}
      />
    </div>
  );
};
