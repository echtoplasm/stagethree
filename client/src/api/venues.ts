import { apiFetch } from '../utils/api';

/**
 * Represents a venue in the StageThree system.
 */
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
 * Fetches all venues in the system.
 * @returns A promise resolving to an array of all venues.
 */
export const fetchAllVenues = async (): Promise<Venue[]> => {
  return apiFetch('/api/venues/', {
    method: 'GET',
  });
};

/**
 * Creates a new venue.
 * @param formData - Venue data excluding auto-generated fields.
 * @returns A promise that resolves when the venue is created.
 */
export const createVenue = async (formData: Omit<Venue, 'id' | 'createdAt'>): Promise<void> => {
  return apiFetch('/api/venues', {
    method: 'POST',
    body: formData,
  });
};

/**
 * Soft deletes a venue by ID.
 * @param venueId - The ID of the venue to delete.
 * @returns A promise that resolves when the venue is deleted.
 */
export const deleteVenue = async (venueId: number): Promise<void> => {
  return apiFetch(`/api/venues/${venueId}`, {
    method: 'DELETE',
  });
};

/**
 * Updates an existing venue by ID.
 * @param venueId - The ID of the venue to update.
 * @param venueForm - Updated venue data excluding auto-generated fields.
 * @returns A promise that resolves when the venue is updated.
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
 * Fetches all venues created by a specific user.
 * @param userId - The ID of the user whose venues to retrieve.
 * @returns A promise resolving to an array of venues belonging to the user.
 */
export const getVenuesByUserId = async (userId: number): Promise<Venue[]> => {
  return apiFetch(`/api/venues/user/${userId}`, {
    method: 'GET',
  });
};
