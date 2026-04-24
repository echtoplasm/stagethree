import { apiFetch } from '../utils/api';
import type { LoginResponse, LoginRequest } from '../types/api';

/**
 * Checks the current authentication state by validating the session cookie.
 * Uses skipAuthRedirect to prevent redirect loops on unauthenticated requests.
 */
export const fetchAuthMe = async () => {
  return apiFetch('/api/auth/me', {
    credentials: 'include',
    method: 'POST',
    skipAuthRedirect: true,
  });
};


/**
 * Authenticates a user with email and password credentials.
 *
 * @param email - The user's email address.
 * @param password - The user's password.
 */
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const requestBody: LoginRequest = { email, password };
  return apiFetch<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: requestBody,
    skipAuthRedirect: true,
  });
};

/** Logs out the current user and clears the session cookie server-side. */
export const logoutUser = async (): Promise<void> => {
  return apiFetch('/api/auth/signout', {
    method: 'POST',
  });
};
