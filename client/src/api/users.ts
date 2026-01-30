import type { LoginResponse, LoginRequest } from "src/types/api";
import { apiFetch } from "../utils/api";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface User {
  id_usr: number;
  email_usr: string;
  password_hash_usr: string;
  first_name_usr: string;
  last_name_usr: string;
  is_active_usr: boolean;
  created_at_usr: Date;
}

export const getUsers = async (): Promise<User[]> => {
return apiFetch('/api/users');
};

//POST REQUEST
export const createUser = async (user: Omit<User, 'id_usr' | 'created_at_usr'>): Promise<User> => {
  const response = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('unable to create new user');
  }
  return response.json();
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const requestBody: LoginRequest = { email, password }
  const response = await fetch(`${API_URL}/api/users/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error('unable to login');
  }
  return response.json();
};

export const updateUser = async (id: number, updates: Partial<User>): Promise<User> => {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
};

export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete user');
};


