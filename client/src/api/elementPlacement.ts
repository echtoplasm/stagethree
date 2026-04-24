import { apiFetch } from '../utils/api';

/**
 * Represents a 3D element placed on a stage plot, including transform data
 * for position, rotation, and scale on all three axes.
 */
export interface ElementPlacement {
  createdAt?: string;
  id?: number;
  elementTypeId: number;
  stagePlotId?: number;
  name: string;
  filePathImg?: string;
  positionX: number;
  positionY: number;
  positionZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
}

/**
 * Creates a new element placement on a stage plot.
 *
 * @param data - The full element placement data including type, position, rotation, and scale.
 * @returns The newly created element placement returned from the API.
 */
export const createNewElementPlacement = async (
  data: ElementPlacement
): Promise<ElementPlacement> => {
  const newPlacement = await apiFetch('/api/elp', {
    method: 'POST',
    body: data,
  });
  return newPlacement.newPlacement;
};

/**
 * Updates the position of an existing element placement by ID.
 * Only positionX, positionY, and positionZ are sent to the API.
 *
 * @param id - The ID of the element placement to update.
 * @param data - Partial element placement data; only position fields are applied.
 */
export const updateElementPlacement = async (
  id: number,
  data: Partial<ElementPlacement>
): Promise<ElementPlacement> => {
  const updatedElp = await apiFetch(`/api/elp/${id}`, {
    method: 'PATCH',
    body: {
      positionX: data.positionX,
      positionY: data.positionY,
      positionZ: data.positionZ,
    },
  });
  return updatedElp;
};

/**
 * Deletes an element placement by ID.
 *
 * @param id - The ID of the element placement to delete.
 */
export const deleteElementPlacement = async (id: number) => {
  await apiFetch(`/api/elp/${id}`, {
    method: 'DELETE'
  })
}

