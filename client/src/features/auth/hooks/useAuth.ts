import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../services/authApi';
import type { LoginCredentials, RegisterCredentials } from '../types/auth.types';

export function useAuth() {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      try {
        const res = await authApi.getMe();
        return res.data;
      } catch {
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 15,
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(['user', 'me'], data.data.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (credentials: RegisterCredentials) => authApi.register(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(['user', 'me'], data.data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.setQueryData(['user', 'me'], null);
    },
  });

  return {
    user: userQuery.data || null,
    isLoading: userQuery.isLoading,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isAuthenticating: loginMutation.isPending || registerMutation.isPending,
  };
}
