import db from '../db/knex';
import { Request, Response } from 'express';
import { dbProjectToApi, apiProjectToDb, ProjectDB, StagePlotDB } from '../utils/transformers';
import { asyncWrapProviders } from 'node:async_hooks';

const projectTable = 'project_prj';

/**
 * GET api/projects
 * get all projects
 */
export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const rows: ProjectDB[] = await db(projectTable).select('*');
    const projects = rows.map(dbProjectToApi);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching all projects:', error);
    res.status(500).json({ error: 'Failed to fetch all projects' });
  }
};

/**
 * GET api/projects/:id
 * get project by id
 */
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const row: ProjectDB[] = await db(projectTable).where({ id_prj: id });
    const project = row.map(dbProjectToApi);
    res.json(project);
  } catch (error) {
    console.error('error fetching project by id', error);
    res.status(500).json({ error: 'Failed to fetch project by id' });
  }
};

/**
 * POST api/projects
 * Create project
 */
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const dbData = apiProjectToDb(req.body);
    const [row]: ProjectDB[] = await db(projectTable).insert(dbData).returning('*');
    const project = dbProjectToApi(row);
    res.json(project);
  } catch (error) {
    console.error('error creating project', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

/**
 * PUT api/projects/:id
 *  Update project
 */

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const exists = await db(projectTable).where({
      id_prj: id,
    });

    if (!exists) {
      res.status(404).json({
        error: 'user does not exists',
      });
    }

    const updates = apiProjectToDb({ name, description });

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ error: 'No valid fields to update' });
      return;
    }

    const [result]: ProjectDB[] = await db(projectTable)
      .where({ id_prj: id })
      .update(updates)
      .returning('*');

    res.json(dbProjectToApi(result));
  } catch (error) {
    console.error('Unable to update project', error);
    res.status(404).json({ error: 'unable to update project' });
  }
};

/**
 * DELETE /api/projects/:id
 * delete project by id
 */

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const [result]: ProjectDB[] = await db(projectTable)
      .delete()
      .where({
        id_prj: id,
      })
      .returning('*');

    res.json(dbProjectToApi(result));
  } catch (error) {
    console.error('unable to delete project', error);
    res.status(404).json({ error: 'unable to delete project' });
  }
};

