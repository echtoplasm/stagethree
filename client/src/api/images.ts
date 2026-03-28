import { apiFetch } from '../utils/api';

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

/**
 * @returns
 */
export const fetchAllImages = async (): Promise<Image[]> => {
  const imageData = await apiFetch('/api/images/');
  return imageData;
};

/**
 * @param id -
 * @returns
 */
export const deleteImageById = async (id: number): Promise<void> => {
  const imageDelete = await apiFetch(`/api/images/${id}`, {
    method: 'DELETE',
  });
  return imageDelete;
};

/**
 * @param name -
 * @param category -
 * @param file -
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

export const updateImageById = async (id: number, form: Partial<Image>): Promise<void> => {
  await apiFetch(`/api/images/${id}`, {
    method: 'PATCH',
    body: form,
  });
};
