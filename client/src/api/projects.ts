import type { User } from 'src/types/api';
import { apiFetch } from '../utils/api';
import { type Stage } from './stages';
import type { FullStagePlotResponse } from './stagePlots';
import { type StagePlot } from './stagePlots';

export interface Project {
  id: number;
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

export const createNewProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  return apiFetch('/api/projects', {
    method: 'POST',
    body: project,
  });
};

export const deleteProject = async (projectId: number): Promise<Project> => {
  return apiFetch(`/api/projects/${projectId}`, {
    method: 'DELETE',
  });
};

export const createDefaultProjectAndPlot = async (user: User): Promise<FullStagePlotResponse> => {
  const defaultProject: Omit<Project, 'id' | 'createdAt'> = {
    userId: user.id,
    name: 'Default Project Name',
    description: 'This is a placeholder project',
  };

  const defaultStage: Omit<Stage, 'id' | 'createdAt'> = {
    name: 'Default stage',
    width: 20,
    depth: 20,
    height: 5,
    createdBy: user.id,
  };

  const defaultStagePlot: Omit<StagePlot, 'id' | 'projectId' | 'stageId' | 'createdAt'> = {
    name: 'Default StagePlot',
  };

  return apiFetch('/api/projects/default', {
    method: 'POST',
    body: { defaultProject, defaultStage, defaultStagePlot },
  });
};
