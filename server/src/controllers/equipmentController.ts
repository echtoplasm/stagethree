import { Request, Response } from 'express';
import db from '../db/knex';
import {
  dbEquipmentTypeToApi as equipToApi,
  EquipmentTypeDB,
  StageDB,
} from '../utils/transformers';

const equipTable = 'equipment_type_eqt';


/**
 * GET /api/equipment/
 * Fetch all equipment
 */
export const getAllEquipment = async (req: Request, res: Response): Promise<void> => {
  console.log('getAllStages called');
  try {
    const rows: EquipmentTypeDB[] = await db(equipTable).select('*');
    console.log('stage result', rows);

    const stages = rows.map(equipToApi);
    res.json(stages);
  } catch (err) {
    console.error('Error in getallstages', err);
    res.status(500).json({ message: 'Unable to fetch all stages' });
  }
};

/**
 * GET /api/equipment/:id
 * Fetch a single piece of equipment by ID
 */
export const getEquipmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const equipment: EquipmentTypeDB | undefined = await db(equipTable)
      .where({ id_eqt: id })
      .first();

    if (!equipment) {
      res.status(404).json({ error: 'stage not found' });
      return;
    }

    res.json(equipToApi(equipment));
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

/*=======Personal Notes ============
 * 
 * I am not sure that we will need a update or post
 * route since Ideally the app will provide the equipment
 * a user needs
 *
 ===================================*/


