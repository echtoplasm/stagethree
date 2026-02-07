import { Request, Response } from 'express';
import { StateDB, StateAPI, apiStateToDb, dbStateToApi } from '../utils/transformers';
import db from '../db/knex';

const stateTable = 'state_sta';

/**
 * GET /api/states
 * Get all states for a dropdown
 */
export const getAllStates = async (req: Request, res: Response): Promise<void> => {
  try {
    const [results]: StateDB[] = await db(stateTable).select('*');
    res.json(dbStateToApi(results));
  } catch (err) {
    console.error('unable to get all states', err);
  }
};
