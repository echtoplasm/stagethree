import { apiFetch } from '../utils/api';
export interface Venue {
  id: number;
  name: string;
  address?: string;
  city?: string;
  stateId?: number | null;
  capacity?: number;
  createdAt: string;
  createdBy: number;
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

/**
 * Create a venue
 *
 */

export const createVenue = async (formData: Omit<Venue, 'id' | 'createdAt'>): Promise<void> => {
  return apiFetch('/api/venues', {
    method: 'POST',
    body: formData,
  });
};

/**
 * @param venueId -
 * @returns
 */
export const deleteVenue = async (venueId: number): Promise<void> => {
  return apiFetch(`/api/venues/${venueId}`, {
    method: 'DELETE',
  });
};

/**
 *
 */

export const updateVenue = async (
  venueId: number,
  venueForm: Omit<Venue, 'id' | 'createdAt'>
): Promise<void> => {
  return apiFetch(`/api/venues/${venueId}`, {
    method: 'UPDATE',
    body: venueForm,
  });
};

/**
 *
 */

export const getVenuesByUserId = async (userId: number): Promise<Venue[]> => {
  return apiFetch(`/api/venues/user/${userId}`, {
    method: 'GET',
  });
};
