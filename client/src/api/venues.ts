import { apiFetch } from '../utils/api';
export interface Venue {
  id: number;
  name: string;
  address?: string;
  city?: string;
  stateId?: number;
  countryId?: number;
  capacity?: number;
  createdAt: string;
}

/**
 * fetch all venues
 *
 */

export const fetchAllVenues = async (): Promise<Venue[]> => {
  return apiFetch('/api/venues/', {
    method: 'GET',
  });
};
