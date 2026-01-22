const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  created_at: Date;
  updated_at?: Date;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/api/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const createUser = async (user: Omit<User, 'id' | 'created_at'>): Promise<User> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error('Failed to create user');
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
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete user');
};
