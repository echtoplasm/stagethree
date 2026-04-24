import { apiFetch } from "../utils/api";

import {type User} from "../types/api"

/** Fetches all users. */
export const getUsers = async (): Promise<User[]> => {
  return apiFetch<User[]>('/api/users');
};

/**
 * Fetches a single user by ID.
 *
 * @param id - The ID of the user to fetch.
 */
export const getUserById = async (id: number): Promise<User> => {
  return apiFetch<User>(`/api/users/${id}`);
};

/**
 * Registers a new user account.
 *
 * @param userData - Registration fields including email, password, name, and optional Turnstile token.
 */
export const createUser = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  turnstileToken?: string;
}): Promise<User> => {
  return apiFetch<User>('/api/users/register', {
    method: 'POST',
    body: userData,
  });
};

/**
 * Updates an existing user by ID with the provided partial data.
 *
 * @param id - The ID of the user to update.
 * @param updates - Partial user fields to update.
 */
export const updateUser = async (id: number, updates: Partial<User>): Promise<User> => {
  return apiFetch<User>(`/api/users/${id}`, {
    method: 'PUT',
    body: updates,
  });
};

/**
 * Deletes a user by ID.
 *
 * @param id - The ID of the user to delete.
 */
export const deleteUser = async (id: number): Promise<void> => {
  return apiFetch<void>(`/api/users/${id}`, {
    method: 'DELETE',
  });
};


