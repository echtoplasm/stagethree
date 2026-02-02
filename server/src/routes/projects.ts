import { Router } from "express"; 
import { getAllProjects } from "../controllers/projectController";

const projectRouter = Router(); 

projectRouter.get('/', getAllProjects);

export default projectRouter;
