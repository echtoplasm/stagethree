import { Request, Response } from 'express';
import db from '../db/knex';

export const getAllStages = async (req: Request, res: Response): Promise<void> => {
  console.log('getAllStages called');
  try {
    // Check which database we're connected to   
    const result = await db('stage').select('*');
    console.log('stage result', result);
    res.json(result);
  } catch (err) {
    console.error('Error in getallstages', err);
    res.status(500).json({ message: 'Unable to fetch all stages' });
  }
};
