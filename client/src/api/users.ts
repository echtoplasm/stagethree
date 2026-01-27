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
  const response = await fetch(`${API_URL}/api/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const createUser = async (user: User): Promise<User> => {
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
