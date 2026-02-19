import { Router } from 'express';
import {
  getAllStages,
  getStageById,
  deleteStage,
  updateStage,
  createStage,
} from '../controllers/stageController';

const stageRouter = Router();

stageRouter.get('/', getAllStages);
stageRouter.get('/:id', getStageById);
stageRouter.delete('/:id', deleteStage);
stageRouter.put('/:id', updateStage);
stageRouter.post('/', createStage);
export default stageRouter;
