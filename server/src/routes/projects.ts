import { Router } from 'express';
import {
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

export default projectRouter;
