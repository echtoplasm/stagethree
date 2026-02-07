import { Router } from "express";
import { getAllStages, getStageById } from "../controllers/stageController";

const stageRouter = Router(); 

stageRouter.get('/', getAllStages);
stageRouter.get('/:id', getStageById);

export default stageRouter;
