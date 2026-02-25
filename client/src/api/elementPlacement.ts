import { apiFetch } from '../utils/api';

export interface ElementPlacement {
  createdAt?: string;
  id?: number;
  elementTypeId: number;
  stagePlotId: number;
  name: string;
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

export const createNewElementPlacement = async (data: ElementPlacement): Promise<ElementPlacement> => {
  const newPlacement = await apiFetch('/api/elp', {
    method: 'POST',
    body: data,
  });
  return newPlacement.newPlacement;
};
