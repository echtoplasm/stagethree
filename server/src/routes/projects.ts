import { Router } from "express"; 
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from "../controllers/projectController";

const projectRouter = Router(); 

projectRouter.get('/', getAllProjects);
projectRouter.get('/:id', getProjectById);
projectRouter.post('/', createProject);
projectRouter.delete('/:id', deleteProject);
projectRouter.put('/:id', updateProject);

export default projectRouter;
