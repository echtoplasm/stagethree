import type { User } from 'src/types/api';
import { apiFetch } from '../utils/api';
import { type Stage } from './stages';
import type { FullStagePlotResponse } from './stagePlots';
import { type StagePlot } from './stagePlots';


/** Represents a project that groups stage plots under a single user. */
export interface Project {
  id: number;
  userId: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** Fetches all projects across all users. */
export const fetchAllProjects = async (): Promise<Project[]> => {
  return apiFetch('/api/projects');
};

/**
 * Fetches all projects belonging to a specific user.
 *
 * @param id - The ID of the user to fetch projects for.
 */
export const fetchAllProjectByUserId = async (id: number): Promise<Project[]> => {
  return apiFetch(`/api/projects/user/${id}`);
};

/**
 * Creates a new project.
 *
 * @param project - Project fields excluding the auto-generated id.
 */
export const createNewProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  return apiFetch('/api/projects', {
    method: 'POST',
    body: project,
  });
};

/**
 * Deletes a project by ID.
 *
 * @param projectId - The ID of the project to delete.
 */
export const deleteProject = async (projectId: number): Promise<Project> => {
  return apiFetch(`/api/projects/${projectId}`, {
    method: 'DELETE',
  });
};

/**
 * Creates a default project, stage, and stage plot for a newly registered user.
 * Sends a single request that bootstraps all three resources server-side.
 *
 * @param user - The authenticated user to create the default project for.
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
 * Updates an existing project by ID with the provided data.
 *
 * @param projectId - The ID of the project to update.
 * @param projectData - Project fields excluding the id.
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
