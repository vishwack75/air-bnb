import { apiClient } from '../../../services/apiClient';
import type { Listing, ListingQueryParams } from '../types/listing.types';
import type { ApiResponse } from '../../../types/api.types';

export const listingApi = {
  getListings: async (params?: ListingQueryParams): Promise<ApiResponse<Listing[]>> => {
    const response = await apiClient.get('/listings', { params });
    return response.data;
  },

  getCities: async (): Promise<ApiResponse<{ city: string; country: string; count: number }[]>> => {
    const response = await apiClient.get('/listings/cities');
    return response.data;
  },

  getListingById: async (id: string): Promise<ApiResponse<Listing>> => {
    const response = await apiClient.get(`/listings/${id}`);
    return response.data;
  },

  createListing: async (data: Partial<Listing>): Promise<ApiResponse<Listing>> => {
    const response = await apiClient.post('/listings', data);
    return response.data;
  },

  updateListing: async (id: string, data: Partial<Listing>): Promise<ApiResponse<Listing>> => {
    const response = await apiClient.patch(`/listings/${id}`, data);
    return response.data;
  },

  deleteListing: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(`/listings/${id}`);
    return response.data;
  },
};
