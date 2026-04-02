import { Router } from 'express';
import {
  getAllStagePlots,
  getStagePlotById,
  getAllStagePlotsByProjectId,
  createStagePlot,
  updateStagePlot,
  deleteStagePlot,
  getFullStagePlotInfo,
  getAllStagePlotsByUserId,
  getStagePlotByUUID,
} from '../controllers/stageplot';

const stagePlotRouter = Router();

stagePlotRouter.get('/', getAllStagePlots);

//Need to test and make sure this route works in BRUNO
stagePlotRouter.get('/projects/:id', getAllStagePlotsByProjectId);
stagePlotRouter.get('/:id', getStagePlotById);
stagePlotRouter.post('/', createStagePlot);
stagePlotRouter.put('/:id', updateStagePlot);
stagePlotRouter.delete('/:id', deleteStagePlot);
stagePlotRouter.get('/full/:id', getFullStagePlotInfo);
stagePlotRouter.get('/user/:id', getAllStagePlotsByUserId);
stagePlotRouter.post('/', createStagePlot);
stagePlotRouter.get('/share/:uuid', getStagePlotByUUID);
export default stagePlotRouter;
