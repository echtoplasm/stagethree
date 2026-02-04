import { apiFetch } from '../utils/api';

export interface Project {
  id: number;
  userId: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}

export const fetchAllProjects = async (): Promise<Project[]> => {
  return apiFetch('/api/projects')
};
