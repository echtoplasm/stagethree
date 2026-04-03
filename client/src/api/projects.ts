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

/**
 * @returns
 */
export const fetchAllProjects = async (): Promise<Project[]> => {
  return apiFetch('/api/projects');
};

/**
 * @param id -
 * @returns
 */
export const fetchAllProjectByUserId = async (id: number): Promise<Project[]> => {
  return apiFetch(`/api/projects/user/${id}`);
};

/**
 * @param project -
 * @returns
 */
export const createNewProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  return apiFetch('/api/projects', {
    method: 'POST',
    body: project,
  });
};

/**
 * @param projectId -
 * @returns
 */
export const deleteProject = async (projectId: number): Promise<Project> => {
  return apiFetch(`/api/projects/${projectId}`, {
    method: 'DELETE',
  });
};

/**
 * @param user -
 * @returns
 */
export const createDefaultProjectAndPlot = async (user: User): Promise<FullStagePlotResponse> => {
  const defaultProject: Omit<Project, 'id' | 'createdAt'> = {
    userId: user.id,
    name: 'Default Project Name',
    description: 'This is a placeholder project',
  };

  const defaultStage: Omit<Stage, 'id' | 'createdAt' | 'venueId'> = {
    name: 'Default stage',
    width: 20,
    depth: 20,
    height: 5,
    createdBy: user.id,
    isPublic: false,
  };

  const defaultStagePlot: Omit<StagePlot, 'id' | 'projectId' | 'stageId' | 'createdAt' | 'gigDate' | 'stagePlotUUID'> = {
    name: 'Default StagePlot',
  };

  return apiFetch('/api/projects/default', {
    method: 'POST',
    body: { defaultProject, defaultStage, defaultStagePlot },
  });
};

/**
 * @param projectId -
 * @param projectData -
 * @returns
 */
export const updateProject = async (
  projectId: number,
  projectData: Omit<Project, 'id'>
): Promise<Project> => {
  return apiFetch(`/api/projects/${projectId}`, {
    method: 'PATCH',
    body: projectData,
  });
};
