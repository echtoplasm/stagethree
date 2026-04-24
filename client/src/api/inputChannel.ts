import { apiFetch } from '../utils/api';


/**
 * Represents a single channel in a stage plot's input list,
 * including instrument, mic type, and any additional notes.
 */
export interface InputChannel {
  id: number;
  stagePlotId: number;
  channelNumber: number;
  instrumentName: string;
  micType?: string;
  notes?: string;
  createdAt: string;
}

/**
 * Adds a new input channel to a stage plot's input list.
 *
 * @param data - Channel data excluding auto-generated id, micType, notes, and createdAt.
 */
export const addInputChannel = async (
  data: Omit<InputChannel, 'id' | 'micType' | 'notes' | 'createdAt'>
) : Promise<InputChannel>  => {
  return apiFetch(`/api/inputchannels/`, {
    method: 'POST',
    body: data,
  });
};

/**
 * Updates an existing input channel by ID with the provided partial data.
 *
 * @param inputChannelId - The ID of the input channel to update.
 * @param data - Partial input channel fields to update.
 */
export const updateInputChannel = async(inputChannelId: number, data: Partial<InputChannel>): Promise<InputChannel> => {
  return apiFetch(`/api/inputchannels/${inputChannelId}`, {
    method: 'PATCH', 
    body: data,
  })
}
