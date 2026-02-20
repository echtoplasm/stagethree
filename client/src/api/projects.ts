import { apiFetch } from '../utils/api';

export interface Project {
  id?: number;
  userId: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const fetchAllProjects = async (): Promise<Project[]> => {
  return apiFetch('/api/projects');
};

export const fetchAllProjectByUserId = async (id: number): Promise<Project[]> => {
  return apiFetch(`/api/projects/user/${id}`);
};

export const createNewProject = async (data: Project): Promise<void> => {
  return apiFetch('/api/projects', {
    method: 'POST',
    body: data
  })
}
