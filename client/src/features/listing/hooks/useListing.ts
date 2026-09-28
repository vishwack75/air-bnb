import { useQuery } from '@tanstack/react-query';
import { listingApi } from '../services/listingApi';

export function useListing(id: string) {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      const res = await listingApi.getListingById(id);
      return res.data;
    },
    enabled: Boolean(id),
  });
}
