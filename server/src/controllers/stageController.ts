import { Request, Response } from 'express';
import db from '../db/knex';
import { apiStageToDb, dbStagePlotToApi, dbStageToApi, StageDB } from '../utils/transformers';

const stageTable = 'stage_stg';

/**
 * GET /api/stages/
 * Get all stages
 *
 */
export const getAllStages = async (req: Request, res: Response): Promise<void> => {
  console.log('getAllStages called');
  try {
    // Check which database we're connected to
    const rows: StageDB[] = await db(stageTable).select('*').whereNull('deleted_at_stg');
    console.log('stage result', rows);

    const stages = rows.map(dbStageToApi);
    res.json(stages);
  } catch (err) {
    console.error('Error in getallstages', err);
    res.status(500).json({ message: 'Unable to fetch all stages' });
  }
};

/**
 * GET /api/stages/public
 *  get all publically available stages
 *
 */

export const getAllPublicStages = async (req: Request, res: Response): Promise<void> => {
  console.log('getAllPublicStages called');
  try {
    const rows: StageDB[] = await db(stageTable)
      .select('*')
      .where({
        is_public_stg: 't',
      })
      .whereNull('deleted_at_stg');

    const publicStages = rows.map(dbStageToApi);
    res.json(publicStages);
  } catch (err) {
    console.error('error in getAllPublicStages', err);
    res.status(500).json({
      message: 'unable to get all publically availabe stages',
    });
  }
};

/**
 * GET /api/stages/:id
 * Get stage by ID
 *
 */
export const getStageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const exists = await db(stageTable)
      .select()
      .where({
        id_stg: id,
      })
      .whereNull('deleted_at_stg')
      .first();

    if (!exists) {
      res.status(500).json({
        error: 'Sorry a stage with that ID does not exist',
      });
    }

    const result: StageDB = await db(stageTable)
      .where({
        id_stg: id,
      })
      .first();

    res.json(dbStageToApi(result));
  } catch (err) {}
};

/**
 * POST /api/stages
 * Create stages
 *
 */

export const createStage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, width, depth, height, createdBy } = req.body;

    if (!name || !width || !depth || !height || !createdBy) {
      res.status(400).json({
        message: 'missing one of required fields',
      });
    }

    const data = { name, width, depth, height, createdBy };

    const dbdata = apiStageToDb(data);

    const [result]: StageDB[] = await db(stageTable).insert(dbdata).returning('*');

    res.json(dbStageToApi(result));
  } catch (err) {
    console.error('unable to post create stage');
    res.status(500).json({
      message: 'unable to create stage',
      error: err,
    });
  }
};

/**
 * DELETE /api/stages/:id
 * delete stage by id
 *
 */

export const deleteStage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const exists = await db(stageTable).select().where({ id_stg: id }).first();

    if (!exists) {
      res.status(404).json({
        error: 'Stage with that ID does not exist',
      });
      return;
    }

    const [result]: StageDB[] = await db(stageTable)
      .where({ id_stg: id })
      .update({ deleted_at_stg: db.fn.now() })
      .returning('*');

    res.json(dbStageToApi(result));
  } catch (err) {
    res.status(500).json({
      message: 'Error in delete stage API endpoint',
      error: err,
    });
  }
};

/**
 * PUT /api/stages/:id
 * Update stage by id
 */

export const updateStage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, width, depth, height } = req.body;
    const exists = await db(stageTable)
      .select()
      .where({
        id_stg: id,
      })
      .first();

    if (!exists) {
      res.status(500).json({
        error: 'Stage with that ID does not exist',
      });
    }

    const updates = apiStageToDb({ name, width, depth, height });

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ error: 'No valid fields to update' });
      return;
    }

    const [result]: StageDB[] = await db(stageTable)
      .where({ id_stg: id })
      .update(updates)
      .returning('*');

    res.json(dbStageToApi(result));
  } catch (err) {
    console.error('Error in update stage endpoint');
    res.status(500).json({
      message: 'Error in update storage',
      error: err,
    });
  }
};

/**
 * GET /api/stages/user/:userId
 * get all stages by created_by in order to populate userPortal
 */

export const getAllStagesByCreatedBy = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const results: StageDB[] = await db(stageTable)
      .select()
      .where({
        created_by_stg: userId,
      })
      .whereNull('deleted_at_stg')
      .returning('*');

    const apiResults = results.map(dbStageToApi);

    res.json(apiResults);
  } catch (err) {
    console.error('Error in get all stages by created by ', err);
    res.status(500).json({
      message: 'unable to getAllStagesByCreatedBy',
      error: err,
    });
  }
};
