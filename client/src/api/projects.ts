import { apiFetch } from '../utils/api';

export interface Project {
  id_prj: number;
  id_usr_prj: number;
  name_prj: string;
  description_prj?: string;
  created_at_prj: string;
  updated_at_prj?: string;
}

export const fetchAllProjects = async (): Promise<Project[]> => {
  return apiFetch('/api/projects')
};
