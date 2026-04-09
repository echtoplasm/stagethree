import { apiFetch } from '../utils/api';

export interface ElementType {
  id: number;
  name: string;
  description?: string;
  imageId?: number;
  filePathImg?: string;
  defaultColor?: string;
  defaultScaleX: number;
  defaultScaleY: number;
  defaultScaleZ: number;
  elementCategoryId: number;
}

export const fetchAllElementTypes = async (): Promise<ElementType[]> => {
  const elementTypes = await apiFetch('/api/elements');
  return elementTypes;
};
