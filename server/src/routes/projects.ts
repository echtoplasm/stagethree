import { Router } from "express"; 
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from "../controllers/projectController";
import { authenticateToken } from "../middleware/auth";
const projectRouter = Router(); 

projectRouter.get('/', authenticateToken, getAllProjects);
projectRouter.get('/:id', authenticateToken,getProjectById);
projectRouter.post('/', authenticateToken, createProject);
projectRouter.delete('/:id', authenticateToken, deleteProject);
projectRouter.put('/:id', authenticateToken,updateProject);

export default projectRouter;
