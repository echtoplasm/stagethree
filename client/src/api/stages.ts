const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
import { apiFetch } from '../utils/api';
export interface Stage {
  id: number;
  name: string;
  width: number;
  depth: number;
  height: number;
}

/**
 * @returns
 */
export const fetchAllStages = async (): Promise<Stage[]> => {
  const response = await fetch(`${API_URL}/api/stages`);
  console.log('fetching all stages');
  if (!response.ok) {
    console.error('unable to fetch all stages');
  }

  return response.json();
};

/**
 * @param stageData -
 * @returns
 */
export const createStage = async (stageData: Omit<Stage, 'id'>): Promise<Stage> => {
  return apiFetch<Stage>('/api/stages', {
    method: 'POST',
    body: stageData,
  });
};

/**
 * @param stageId -
 * @returns
 */
export const deleteStage = async (stageId: number): Promise<Stage[]> => {
  return apiFetch(`/api/stages/${stageId}`, {
    method: 'DELETE',
  });
};

/**
 * @param stageId -
 * @param stageData -
 * @returns
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
