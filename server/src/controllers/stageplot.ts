import { Request, Response } from 'express';
import db from '../db/knex';
import {
  dbStagePlotToApi,
  apiStagePlotToDb,
  StagePlotDB,
  StagePlotAPI,
} from '../utils/transformers';

const plotTable = 'stage_plot_stp';

/**
 * GET /api/stageplots/
 * Fetch all stageplots
 */
export const getAllStagePlots = async (req: Request, res: Response): Promise<void> => {
  try {
    const rows: StagePlotDB[] = await db(plotTable).select('*');
    console.log('All stage plot results', rows);

    const stagePlots = rows.map(dbStagePlotToApi);
    res.json(stagePlots);
  } catch (err) {
    console.error('Error in getAllStagePlots', err);
    res.status(500).json({ message: 'Unable to fetch all stageplots' });
  }
};

/**
 * GET /api/stageplots/:id
 * Fetch stageplot by ID
 */

export const getStagePlotById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const plot: StagePlotDB = await db(plotTable).where({ id_stp: id }).first();

    if (!plot) {
      res.status(404).json({
        error: 'No plot with that Id',
      });
    }

    res.json(dbStagePlotToApi(plot));
  } catch (error) {
    console.error('Unable to fetch stage plot by id in fetchStagePlotById', error);
  }
};

/**
 * GET /api/stageplots/projects/:id
 * fetch stageplots by project id
 */

export const getAllStagePlotsByProjectId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const plots: StagePlotDB[] = await db(plotTable).select('*').where({ id_prj_stp: id });

    if (plots.length === 0) {
      res.status(404).json({
        error: 'No plots associated with that project id',
      });
      return;
    }

    const apiPlots = plots.map(dbStagePlotToApi);
    res.json(apiPlots);
  } catch (error) {
    console.error('unable to retrieve stage plots with that project ID', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/stageplots
 * Create stageplot
 *
 */

export const createStagePlot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId, stageId, name } = req.body;

    if (!projectId || !stageId || !name) {
      res.status(404).json({ error: 'Missing one or more required fields' });
    }

    const plotDbData = apiStagePlotToDb({
      projectId,
      stageId,
      name,
    });

    const [plots]: StagePlotDB[] = await db(plotTable).insert(plotDbData).returning('*');

    res.json(dbStagePlotToApi(plots));
  } catch (error) {
    console.error('unable to createStagePlot', error);
  }
};

/**
 * PUT /api/stageplots/:id
 * updated stageplot by id
 */

export const updateStagePlot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { projectId, stageId, name } = req.body;
    if (!projectId || !stageId || !name) {
      res.status(404).json({ error: 'Missing one or more required fields' });
    }

    const plotDbData = apiStagePlotToDb({
      projectId,
      stageId,
      name,
    });

    const [results]: StagePlotDB[] = await db(plotTable)
      .update(plotDbData)
      .where({
        id_stp: id,
      })
      .returning('*');

    res.json(dbStagePlotToApi(results));
  } catch (error) {
    console.error('Unable to updated stage plot', error);
    res.status(500).json({
      error: 'Unable to updated stage plot',
    });
  }
};

/**
 * DELETE /api/stageplots/:id
 * delete stageplot by id
 */

export const deleteStagePlot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const exists = await db(plotTable)
      .select('*')
      .where({
        id_stp: id,
      })
      .first();

    if (!exists) {
      res.status(404).json({
        message: 'There is no stage plot with that ID',
      });
    }

    const [results]: StagePlotDB[] = await db(plotTable)
      .delete()
      .where({
        id_stp: id,
      })
      .returning('*');

    res.json({
    "successfully deleted" : dbStagePlotToApi(results)
    });
  } catch (error) {}
};
