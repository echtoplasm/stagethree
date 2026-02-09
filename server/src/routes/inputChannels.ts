import { Router } from 'express';
import {
  getAllInputChannels,
  getInputChannelById,
  createInputChannel,
  updateInputChannel,
  deleteInputChannel,
  getInputChannelByStagePlotId,
} from '../controllers/inputChannelController';

const inputChannelRouter = Router();

inputChannelRouter.get('/', getAllInputChannels);

//Need to test and make sure this route works in BRUNO
inputChannelRouter.get('/:id', getInputChannelById);
inputChannelRouter.post('/', createInputChannel);
inputChannelRouter.put('/:id', updateInputChannel);
inputChannelRouter.delete('/:id', deleteInputChannel);
inputChannelRouter.get('/stageplots/:id', getInputChannelByStagePlotId);

inputChannelRouter.post('/', createInputChannel);

export default inputChannelRouter;
