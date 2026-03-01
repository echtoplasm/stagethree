import { Router } from 'express';
import {
  createDefaultPlotAndProject,
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  getProjectByUserId,
  updateProject,
} from '../controllers/projectController';
import { authenticateToken } from '../middleware/auth';
const projectRouter = Router();

projectRouter.get('/', authenticateToken, getAllProjects);
projectRouter.get('/:id', authenticateToken, getProjectById);
projectRouter.post('/', authenticateToken, createProject);
projectRouter.delete('/:id', authenticateToken, deleteProject);
projectRouter.put('/:id', authenticateToken, updateProject);
projectRouter.get('/user/:id', authenticateToken, getProjectByUserId);
projectRouter.post('/default', authenticateToken, createDefaultPlotAndProject);

export default projectRouter;
