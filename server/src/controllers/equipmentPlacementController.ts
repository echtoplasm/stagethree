import { Request, Response } from 'express';
import db from '../db/knex';
import {
  dbEquipmentPlacementToApi as eqpToApi,
  apiEquipmentPlacementToDb as eqpToDb,
  EquipmentPlacementDB as EqpDB,
  EquipmentPlacementAPI as EqpAPI,
} from '../utils/transformers';

const eqpTable = 'equipment_placement_eqp';

/**
 * GET /api/eqp/
 * Fetch all equipmentplacements
 */
export const getAllEqp = async (req: Request, res: Response): Promise<void> => {
  try {
    const rows: EqpDB[] = await db(eqpTable).select('*');
    console.log('All equipment placement results', rows);

    const stagePlots = rows.map(eqpToApi);
    res.json(stagePlots);
  } catch (err) {
    console.error('Error in getAllEqp', err);
    res.status(500).json({ message: 'Unable to fetch all elemnent placements' });
  }
};

/**
 * GET /api/eqp/:id
 * Fetch equipmentplacement by ID
 */

export const getEqpById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const placement: EqpDB = await db(eqpTable).where({ id_stp: id }).first();

    if (!placement) {
      res.status(404).json({
        error: 'No eqp with that Id',
      });
    }

    res.json(eqpToApi(placement));
  } catch (error) {
    console.error('Unable to fetch equipment placment', error);
  }
};

/**
 * POST /api/eqp
 * Create equipment placement
 */
export const createEqp = async (req: Request, res: Response): Promise<void> => {
  try {
    const dbData = eqpToDb(req.body);

    if (!dbData.id_stp_eqp || !dbData.id_eqt_eqp) {
      res.status(400).json({
        error: 'Missing required fields: stagePlotId and equipmentTypeId',
      });
      return;
    }

    const [newPlacement] = await db('equipment_placement_eqp').insert(dbData).returning('*');

    res.status(201).json(eqpToApi(newPlacement));
  } catch (error) {
    console.error('Error creating equipment placement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * PUT /api/eqp/:id
 * Update equipment placement
 */
export const updateEqp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dbData = eqpToDb(req.body);

    const [updated] = await db(eqpTable).where({ id_elp: id }).update(dbData).returning('*');

    if (!updated) {
      res.status(404).json({ error: 'equipment placement not found' });
      return;
    }

    res.json(eqpToApi(updated));
  } catch (error) {
    console.error('Error updating equipment placement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * DELETE /api/eqp/:id
 * delete equipment placement by id
 */

export const deleteEqp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const exists = await db(eqpTable)
      .select('*')
      .where({
        id_eqp: id,
      })
      .first();

    if (!exists) {
      res.status(404).json({
        message: 'There is no equipment placement with that ID',
      });
    }

    const [results]: EqpDB[] = await db(eqpTable)
      .delete()
      .where({
        id_stp: id,
      })
      .returning('*');

    res.json(eqpToApi(results));
  } catch (error) {
    console.error('Error deleting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
