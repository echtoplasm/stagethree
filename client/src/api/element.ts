import { apiFetch } from '../utils/api';

export interface ElementType {
  id: number;
  name: string;
  description?: string;
  imageId?: number;
  filePathImg?: string;
  defaultColor?: string;
}


export const fetchAllElementTypes = async (): Promise<ElementType[]> => {
  const elementTypes = await apiFetch('/api/elements');
  console.log(elementTypes);
  return elementTypes;
};
