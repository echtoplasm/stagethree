import db from '../db/knex';
import { Request, Response } from 'express';
import {
  dbProjectToApi,
  apiProjectToDb,
  ProjectDB,
  StagePlotDB,
  apiStagePlotToDb,
  StageDB,
  dbStageToApi,
  apiStageToDb,
  dbStagePlotToApi,
} from '../utils/transformers';

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
    res.status(500).json({ message: 'Failed to fetch project by id', error: error });
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
    res.status(500).json({
      message: 'Failed to create project',
      error: error,
    });
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

/**
 * GET /api/user/projects/:id
 * Get projects by user id in order to populate projects for specific user
 *
 */

export const getProjectByUserId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const projects: ProjectDB[] = await db(projectTable).select('*').where({
    id_usr_prj: id,
  });

  const apiProjects = projects.map(dbProjectToApi);

  res.status(200).json(apiProjects);
};

/**
 * POST /api/projects/default
 * Create default project and plots for authenticated user who has not set
 * a project and plot while plotting
 */

export const createDefaultPlotAndProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { defaultProject, defaultStage, defaultStagePlot } = req.body;

    const defaultProjectDb = apiProjectToDb(defaultProject);
    const defaultStageDb = apiStageToDb(defaultStage);
    const defaultPlotDb = apiStagePlotToDb(defaultStagePlot);

    let project: ProjectDB | undefined;
    let plot: StagePlotDB | undefined;
    let stage: StageDB | undefined;

    await db.transaction(async trx => {
      [project] = await trx('project_prj').insert(defaultProjectDb).returning('*');
      [stage] = await trx('stage_stg').insert(defaultStageDb).returning('*');
      [plot] = await trx('stage_plot_stp')
        .insert({
          ...defaultPlotDb,
          id_prj_stp: project!.id_prj,
          id_stg_stp: stage!.id_stg,
        })
        .returning('*');
    });

    if (!project || !plot || !stage) throw new Error('transaction failed');

    const projectApi = dbProjectToApi(project);
    const stageApi = dbStageToApi(stage);
    const plotApi = dbStagePlotToApi(plot);

    res.status(200).json({
      stage: stageApi,
      project: projectApi,
      stagePlot: plotApi,
    });
  } catch (err) {
    console.error('unable to create default plot and project', err);
    res.status(500).json({
      message: 'unable to create default plot and project',
      error: err,
    });
  }
};
