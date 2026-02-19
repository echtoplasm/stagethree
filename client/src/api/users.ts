
import { apiFetch } from "../utils/api";

import {type User} from "../types/api"

export const getUsers = async (): Promise<User[]> => {
  return apiFetch<User[]>('/api/users');
};

export const getUserById = async (id: number): Promise<User> => {
  return apiFetch<User>(`/api/users/${id}`);
};

export const createUser = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<User> => {
  return apiFetch<User>('/api/users/register', {
    method: 'POST',
    body: userData,
  });
};

export const updateUser = async (id: number, updates: Partial<User>): Promise<User> => {
  return apiFetch<User>(`/api/users/${id}`, {
    method: 'PUT',
    body: updates,
  });
};

export const deleteUser = async (id: number): Promise<void> => {
  return apiFetch<void>(`/api/users/${id}`, {
    method: 'DELETE',
  });
};


