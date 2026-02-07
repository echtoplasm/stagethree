import { Request, Response } from 'express';
import db from '../db/knex';
import { dbStageToApi, StageDB } from '../utils/transformers';
import { asyncWrapProviders } from 'node:async_hooks';

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
    const rows: StageDB[] = await db(stageTable).select('*');
    console.log('stage result', rows);

    const stages = rows.map(dbStageToApi);
    res.json(stages);
  } catch (err) {
    console.error('Error in getallstages', err);
    res.status(500).json({ message: 'Unable to fetch all stages' });
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
