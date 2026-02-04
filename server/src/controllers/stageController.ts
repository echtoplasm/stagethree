import { Request, Response } from 'express';
import db from '../db/knex';
import { dbStageToApi, StageDB } from '../utils/transformers';

export const getAllStages = async (req: Request, res: Response): Promise<void> => {
  console.log('getAllStages called');
  try {
    // Check which database we're connected to   
    const rows : StageDB[] = await db('stage_stg').select('*');
    console.log('stage result', rows);
    
    const stages = rows.map(dbStageToApi);
    res.json(stages); 
  } catch (err) {
    console.error('Error in getallstages', err);
    res.status(500).json({ message: 'Unable to fetch all stages' });
  }
};
