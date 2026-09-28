import { apiClient } from '../../../services/apiClient';
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth.types';
import type { User } from '../../../types/common.types';
import type { ApiResponse } from '../../../types/api.types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post('/auth/register', credentials);
    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};
