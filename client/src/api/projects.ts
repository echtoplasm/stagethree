import { apiFetch } from '../utils/api';

export interface Project {
  id: number;
  user_id: number;
  name: string;
  created_at: string;
}

export const fetchAllProjects = async (): Promise<Project[]> => {
  return apiFetch('/api/projects')
};
