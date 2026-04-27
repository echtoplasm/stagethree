import { apiFetch } from '../utils/api';

export interface State {
  id: number | null;
  name: string;
  abbreviation: string;
}

/**
 * Gets all states for populating state field form
 */

export const getAllStates = async (): Promise<State[]> => {
  return apiFetch('/api/states', {
    method: 'GET',
  });
};
