import { apiFetch } from '../utils/api';

export interface Image {
  id: number;
  name: string;
  filePath: string;
  fileType: string;
  category: number;
  createdAt: string;
}

export const fetchAllImages = async (): Promise<Image[]> => {
  const imageData = await apiFetch('/api/images/');
  return imageData;
};

export const deleteImageById = async (id: number) : Promise<void> => {
  const imageDelete = await apiFetch(`/api/images/${id}`, {
    method: 'DELETE',
  });
  return imageDelete;
};

export const createNewImage = async (name: string, category: number, file: File): Promise<void> => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('category', category.toString());
  formData.append('file', file);
  await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/images`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
};
