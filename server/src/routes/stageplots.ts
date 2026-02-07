import { Router } from 'express';
import { getAllStagePlots, getStagePlotById, getAllStagePlotsByProjectId, createStagePlot } from '../controllers/stageplot';

const stagePlotRouter = Router();

stagePlotRouter.get('/', getAllStagePlots);

//Need to test and make sure this route works in BRUNO
stagePlotRouter.get('/projects/:id', getAllStagePlotsByProjectId)
stagePlotRouter.get('/:id', getStagePlotById);



stagePlotRouter.post('/', createStagePlot);

export default stagePlotRouter;
