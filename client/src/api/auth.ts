import { apiFetch } from '../utils/api';
import type { LoginResponse, LoginRequest } from '../types/api';

export const fetchAuthMe = async () => {
  return apiFetch('/api/auth/me', { 
    credentials: 'include', 
    method: 'POST'
  });
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const requestBody: LoginRequest = { email, password };
  return apiFetch<LoginResponse>('/api/auth/signin', {
    method: 'POST',
    body: requestBody,
  });
};

export const logoutUser = async(): Promise<void> => {
  return apiFetch('/api/auth/signout', {
    method: 'POST'
  });
}
