import { apiFetch } from '../utils/api';

export interface InputChannel {
  id: number;
  stagePlotId: number;
  channelNumber: number;
  instrumentName: string;
  micType?: string;
  notes?: string;
  createdAt: string;
}

export const addInputChannel = async (
  data: Omit<InputChannel, 'id' | 'micType' | 'notes' | 'createdAt'>
) : Promise<InputChannel>  => {
  return apiFetch(`/api/inputchannels/`, {
    method: 'POST',
    body: data,
  });
};
