import axios from 'axios';
import { IListing, IReview, IUser, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Listings
  getListings: async (params?: Record<string, any>): Promise<ApiResponse<IListing[]>> => {
    const response = await apiClient.get('/listings', { params });
    return response.data;
  },

  getListingById: async (id: string): Promise<ApiResponse<IListing>> => {
    const response = await apiClient.get(`/listings/${id}`);
    return response.data;
  },

  // Reviews
  getListingReviews: async (listingId: string): Promise<ApiResponse<IReview[]>> => {
    const response = await apiClient.get(`/listings/${listingId}/reviews`);
    return response.data;
  },

  addReview: async (
    listingId: string,
    reviewData: { rating: number; comment: string; authorName?: string; authorAvatar?: string }
  ): Promise<ApiResponse<IReview>> => {
    const response = await apiClient.post(`/listings/${listingId}/reviews`, reviewData);
    return response.data;
  },

  // Auth
  register: async (userData: { name: string; email: string; password: string }): Promise<ApiResponse<{ user: IUser; token: string }>> => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }): Promise<ApiResponse<{ user: IUser; token: string }>> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  getMe: async (): Promise<ApiResponse<IUser>> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Amenities
  getAmenities: async (): Promise<ApiResponse<any[]>> => {
    const response = await apiClient.get('/amenities');
    return response.data;
  },
};
