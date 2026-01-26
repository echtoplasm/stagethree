import { Router } from "express";
import { getAllStages } from "../controllers/stageController";

const stageRouter = Router(); 

stageRouter.get('/', getAllStages);

export default stageRouter;
