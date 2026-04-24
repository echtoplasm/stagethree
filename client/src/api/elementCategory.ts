import { apiFetch } from '../utils/api';

/** Represents a category used to group element types in the elements drawer. */
export interface ElementCategory {
  id: number;
  name: string;
  createdAt: string;
}

/** Fetches all available element categories. */
export const fetchAllElementCategories = async (): Promise<ElementCategory[]> => {
  const categories = await apiFetch('/api/elementcategories', {
    method: 'GET',
  });
  return categories;
};
