import { apiFetch } from '../utils/api';
import { type ElementPlacement } from './elementPlacement';
import { type InputChannel } from './inputChannel';
import type { Project } from './projects';
import { type Stage } from './stages';

export interface StagePlot {
  id: number;
  stagePlotUUID: string;
  projectId: number;
  stageId?: number;
  name: string;
  createdAt: string;
  gigDate: string;
}

export interface FullStagePlotResponse {
  elements: ElementPlacement[];
  inputChannels: InputChannel[];
  stage: Stage;
  stagePlot: StagePlot;
  project: Project;
}

export interface StagePlotWithStageName extends StagePlot {
  stageName: string;
}

/** Fetches all stage plots across all projects and users. */
export const fetchAllStagePlots = async (): Promise<StagePlot[]> => {
  return apiFetch('/api/stageplots');
};

/**
 * Fetches all stage plots belonging to a specific project, including the stage name.
 *
 * @param projectId - The ID of the project to fetch stage plots for.
 */
export const fetchStagePlotsByProjectId = async (
  projectId: number
): Promise<StagePlotWithStageName[]> => {
  return apiFetch(`/api/stageplots/projects/${projectId}`);
};

/**
 * Fetches the full configuration for a stage plot, including elements,
 * input channels, stage, and project data.
 *
 * @param plotId - The ID of the stage plot to fetch.
 */
export const fetchFullStagePlotConfig = async (plotId: number): Promise<FullStagePlotResponse> => {
  return apiFetch(`/api/stageplots/full/${plotId}`);
};

/**
 * Fetches the full configuration for a stage plot by its public share UUID.
 * Used to render shared plots without authentication.
 *
 * @param uuid - The public UUID of the stage plot.
 */
export const fetchFullStagePlotByUUID = async (uuid: string): Promise<FullStagePlotResponse> => {
  const stageplotUUID = apiFetch(`/api/stageplots/share/${uuid}`);
  return stageplotUUID;
};

/**
 * Creates a new stage plot.
 *
 * @param data - Stage plot fields excluding auto-generated id and createdAt.
 */
export const createStagePlot = async (
  data: Omit<StagePlot, 'id' | 'createdAt'>
): Promise<StagePlot> => {
  return apiFetch(`/api/stageplots`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Soft-deletes a stage plot by ID.
 *
 * @param plotId - The ID of the stage plot to delete.
 */
export const deleteStagePlot = async (plotId: number): Promise<void> => {
  return apiFetch(`/api/stageplots/${plotId}`, {
    method: 'DELETE',
  });
};

/**
 * Fetches all stage plots belonging to a specific user.
 *
 * @param userId - The ID of the user to fetch stage plots for.
 */
export const fetchStagePlotsByUserId = async (userId: number): Promise<StagePlot[]> => {
  return apiFetch(`/api/stageplots/user/${userId}`, {
    method: 'GET',
  });
};

/**
 * Updates a stage plot by ID with the provided partial data.
 *
 * @param plotId - The ID of the stage plot to update.
 * @param data - Partial stage plot fields to update.
 */
export const updatePlot = async (plotId: number, data: Partial<StagePlot>): Promise<StagePlot> => {
  return apiFetch(`/api/stageplots/${plotId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};
