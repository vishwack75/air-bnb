import { useQuery } from '@tanstack/react-query';
import { listingApi } from '../services/listingApi';

export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const response = await listingApi.getCities();
      return response.data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
