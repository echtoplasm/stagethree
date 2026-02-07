import { Request, Response } from 'express';
import db from '../db/knex';
import {
  dbElementTypeToApi as elementToApi,
  ElementTypeDB
} from '../utils/transformers';

const elemTable = 'element_type_elt';


/**
 * GET /api/elements/
 * Fetch all elements
 */
export const getAllElements = async (req: Request, res: Response): Promise<void> => {
  console.log('getAllElements called');
  try {
    const rows: ElementTypeDB[] = await db(elemTable).select('*');
    console.log('element result', rows);

    const elements = rows.map(elementToApi);
    res.json(elements);
  } catch (err) {
    console.error('Error in getallequipment', err);
    res.status(500).json({ message: 'Unable to get all elements' });
  }
};

/**
 * GET /api/elements/:id
 * Fetch a stage element by ID
 */
export const getElementById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const equipment: ElementTypeDB | undefined = await db(elemTable)
      .where({ id_elt: id })
      .first();

    if (!equipment) {
      res.status(404).json({ error: 'equipment not found' });
      return;
    }

    res.json(elementToApi(equipment));
  } catch (error) {
    console.error('Error fetching element by id:', error);
    res.status(500).json({ error: 'Failed to fetch element' });
  }
};

/*=======Personal Notes ============
 * 
 * I am not sure that we will need a update or post
 * route since Ideally the app will provide the equipment
 * a user needs
 *
 ===================================*/


