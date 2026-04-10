import { apiFetch } from '../utils/api';

export interface State {
  id: number | null;
  name: string;
  abbreviation: string;
}

/**
 *
 */

export const getAllStates = async (): Promise<State[]> => {
  return apiFetch('/api/states', {
    method: 'GET',
  });
};
