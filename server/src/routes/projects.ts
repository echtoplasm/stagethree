import { Router } from "express"; 
import { deleteProject, getAllProjects, getProjectById, updateProject } from "../controllers/projectController";

const projectRouter = Router(); 

projectRouter.get('/', getAllProjects);
projectRouter.get('/:id', getProjectById);
projectRouter.delete('/:id', deleteProject);
projectRouter.put('/:id', updateProject);

export default projectRouter;
