import db from '../db/knex';
import { Request, Response } from 'express';
import { dbProjectToApi, apiProjectToDb, ProjectDB } from '../utils/transformers';

export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  const projects = await db('project_prj').select('*');
  res.json(projects);
};
