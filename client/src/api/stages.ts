import { apiFetch } from '../utils/api';

export interface Stage {
  id: number;
  venueId?: number;
  name: string;
  width: number;
  depth: number;
  height?: number;
  isPublic: boolean;
  createdBy: number;
}

export interface PublicStage {
  id: number;
  venueId?: number;
  name: string;
  width: number;
  depth: number;
  height?: number;
  isPublic: boolean;
  createdBy: number;
  venueName: string | null;
  city: string | null;
  capacity: number | null;
  state: string | null;
}

/**
 * Fetches all publicly available stages, including joined venue information.
 *
 * @returns A promise resolving to an array of PublicStage objects.
 */
export const fetchAllPublicStages = async (): Promise<PublicStage[]> => {
  return apiFetch('/api/stages/public', {
    method: 'GET',
  });
};

/**
 * Creates a new stage.
 *
 * @param stageData - The stage data to create, excluding the auto-generated id.
 * @returns A promise resolving to the created Stage object.
 */
export const createStage = async (stageData: Omit<Stage, 'id'>): Promise<Stage> => {
  return apiFetch<Stage>('/api/stages', {
    method: 'POST',
    body: stageData,
  });
};

/**
 * Soft deletes a stage by its ID.
 *
 * @param stageId - The ID of the stage to delete.
 * @returns A promise resolving to the updated array of Stage objects.
 */
export const deleteStage = async (stageId: number): Promise<Stage[]> => {
  return apiFetch(`/api/stages/${stageId}`, {
    method: 'DELETE',
  });
};

/**
 * Updates an existing stage by its ID.
 *
 * @param stageId - The ID of the stage to update.
 * @param stageData - The updated stage data, excluding the id.
 * @returns A promise resolving to the updated array of Stage objects.
 */
export const updateStage = async (
  stageId: number,
  stageData: Omit<Stage, 'id'>
): Promise<Stage[]> => {
  return apiFetch(`/api/stages/${stageId}`, {
    method: 'PUT',
    body: stageData,
  });
};

/**
 * Fetches all stages created by a specific user.
 *
 * @param userId - The ID of the user whose stages to retrieve.
 * @returns A promise resolving to an array of Stage objects.
 */
export const getStagesByUserId = async (userId: number): Promise<Stage[]> => {
  return apiFetch(`/api/stages/user/${userId}`, {
    method: 'GET',
  });
};

/**
 * Fetches all stages associated with a specific venue.
 *
 * @param venueId - The ID of the venue whose stages to retrieve.
 * @returns A promise resolving to an array of Stage objects.
 */
export const getStagesByVenueId = async (venueId: number): Promise<Stage[]> => {
  return apiFetch(`/api/stages/venue/${venueId}`, {
    method: 'GET',
  });
};
