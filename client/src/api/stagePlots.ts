import { apiFetch } from '../utils/api';

export interface StagePlot {
  id: number;
  projectId: number;
  stageId?: number;
  name: string;
  createdAt: string;
}

export const fetchAllStagePlots = async (): Promise<StagePlot[]> => {
  return apiFetch('/api/stageplots');
};

export const fetchStagePlotsByProjectId = async (projectId: number): Promise<StagePlot[]> => {
  return apiFetch(`/api/stageplots/projects/${projectId}`);
};

export const fetchFullStagePlotConfig = async (plotId: number) => {
  return apiFetch(`/api/stageplots/full/${plotId}`);
};

export const createStagePlot = async (data: Omit<StagePlot, 'id' | 'createdAt'>): Promise<StagePlot> => {
  return apiFetch(`/api/stageplots`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
};
