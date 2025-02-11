import axios from 'axios';
import { useAuthStore } from '@/store/use-auth-store';

export const apiClient = axios.create({
  baseURL: '/api',
});

apiClient.interceptors.request.use((config) => {
  const user = useAuthStore.getState().user;
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}); 