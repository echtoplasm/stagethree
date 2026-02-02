import db from '../db/knex';
import { Request, Response } from 'express';

export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  const projects = await db('project_prj').select('*');
  res.json(projects); 
};
