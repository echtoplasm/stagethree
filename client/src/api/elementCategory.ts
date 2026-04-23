import { apiFetch } from '../utils/api';

export interface ElementCategory {
  id: number;
  name: string;
  createdAt: string;
}

export const fetchAllElementCategories = async (): Promise<ElementCategory[]> => {
  const categories = await apiFetch('/api/elementcategories', {
    method: 'GET',
  });
  return categories;
};
