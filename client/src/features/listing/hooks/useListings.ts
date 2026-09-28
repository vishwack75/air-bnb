import { useQuery } from '@tanstack/react-query';
import { listingApi } from '../services/listingApi';
import type { ListingQueryParams } from '../types/listing.types';

export function useListings(params?: ListingQueryParams) {
  return useQuery({
    queryKey: ['listings', params],
    queryFn: () => listingApi.getListings(params),
    select: (response) => ({
      listings: response.data ?? [],
      pagination: response.pagination,
    }),
  });
}
