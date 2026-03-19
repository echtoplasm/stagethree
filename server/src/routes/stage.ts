import { Router } from 'express';
import {
  getAllStages,
  getStageById,
  deleteStage,
  updateStage,
  createStage,
  getAllStagesByCreatedBy,
  getAllPublicStages,
  getStagesByVenueId,
} from '../controllers/stageController';

const stageRouter = Router();

stageRouter.get('/', getAllStages);
stageRouter.get('/public', getAllPublicStages);
stageRouter.get('/:id', getStageById);
stageRouter.delete('/:id', deleteStage);
stageRouter.put('/:id', updateStage);
stageRouter.post('/', createStage);
stageRouter.get('/user/:userId', getAllStagesByCreatedBy);
stageRouter.get('/venue/:venueId', getStagesByVenueId);

export default stageRouter;
