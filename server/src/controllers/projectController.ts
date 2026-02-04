import db from '../db/knex';
import { Request, Response } from 'express';
import { dbProjectToApi, apiProjectToDb, ProjectDB } from '../utils/transformers';

export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const rows: ProjectDB[] = await db('project_prj').select('*');
    const projects = rows.map(dbProjectToApi);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching all projects:', error);
    res.status(500).json({ error: 'Failed to fetch all projects' });
  }
};
