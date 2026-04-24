import { apiFetch } from '../utils/api';

/**
 * Represents a 3D element image asset stored in R2, including default scale
 * values used when the element is placed on a stage plot.
 */
export interface Image {
  id: number;
  name: string;
  filePath: string;
  fileType: string;
  category: number;
  createdAt: string;
  defaultScaleX: number;
  defaultScaleY: number;
  defaultScaleZ: number;
}

/** Fetches all available element image assets. */
export const fetchAllImages = async (): Promise<Image[]> => {
  const imageData = await apiFetch('/api/images/');
  return imageData;
};


/**
 * Deletes an image asset by ID.
 *
 * @param id - The ID of the image to delete.
 */
export const deleteImageById = async (id: number): Promise<void> => {
  const imageDelete = await apiFetch(`/api/images/${id}`, {
    method: 'DELETE',
  });
  return imageDelete;
};

/**
 * Uploads a new image asset. Uses a raw fetch with FormData instead of apiFetch
 * since the request is multipart/form-data rather than JSON.
 *
 * @param name - Display name for the image.
 * @param category - The element category ID this image belongs to.
 * @param description - A short description of the image asset.
 * @param file - The file to upload.
 */
export const createNewImage = async (
  name: string,
  category: number,
  description: string,
  file: File
): Promise<void> => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('category', category.toString());
  formData.append('description', description);
  formData.append('file', file);
  await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/images`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
};

/**
 * Updates an existing image asset by ID with the provided partial data.
 *
 * @param id - The ID of the image to update.
 * @param form - Partial image fields to update.
 */
export const updateImageById = async (id: number, form: Partial<Image>): Promise<void> => {
  await apiFetch(`/api/images/${id}`, {
    method: 'PATCH',
    body: form,
  });
};
