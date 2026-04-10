import { apiFetch } from '../utils/api';
import { type ElementPlacement } from './elementPlacement';
import { type InputChannel } from './inputChannel';
import type { Project } from './projects';
import { type Stage } from './stages';

export interface StagePlot {
  id: number;
  stagePlotUUID: string;
  projectId: number;
  stageId?: number;
  name: string;
  createdAt: string;
  gigDate: string;
}

export interface FullStagePlotResponse {
  elements: ElementPlacement[];
  inputChannels: InputChannel[];
  stage: Stage;
  stagePlot: StagePlot;
  project: Project;
}

export interface StagePlotWithStageName extends StagePlot {
  stageName: string;
}

export const fetchAllStagePlots = async (): Promise<StagePlot[]> => {
  return apiFetch('/api/stageplots');
};

export const fetchStagePlotsByProjectId = async (
  projectId: number
): Promise<StagePlotWithStageName[]> => {
  return apiFetch(`/api/stageplots/projects/${projectId}`);
};

export const fetchFullStagePlotConfig = async (plotId: number): Promise<FullStagePlotResponse> => {
  return apiFetch(`/api/stageplots/full/${plotId}`);
};

export const fetchFullStagePlotByUUID = async (uuid: string): Promise<FullStagePlotResponse> => {
  const stageplotUUID = apiFetch(`/api/stageplots/share/${uuid}`);
  return stageplotUUID;
};

export const createStagePlot = async (
  data: Omit<StagePlot, 'id' | 'createdAt'>
): Promise<StagePlot> => {
  return apiFetch(`/api/stageplots`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const deleteStagePlot = async (plotId: number): Promise<void> => {
  return apiFetch(`/api/stageplots/${plotId}`, {
    method: 'DELETE',
  });
};

export const fetchStagePlotsByUserId = async (userId: number): Promise<StagePlot[]> => {
  return apiFetch(`/api/stageplots/user/${userId}`, {
    method: 'GET',
  });
};

export const updatePlot = async (plotId: number, data: Partial<StagePlot>): Promise<StagePlot> => {
  return apiFetch(`/api/stageplots/${plotId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};
