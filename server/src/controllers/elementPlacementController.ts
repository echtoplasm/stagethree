import { Request, Response } from 'express';
import db from '../db/knex';
import {
  dbElementPlacementToApi as elpToApi,
  apiElementPlacementToDb as elpToDb,
  ElementPlacementDB as ElpDB,
  ElementPlacementAPI as ElpAPI,
} from '../utils/transformers';

const elpTable = 'element_placement_elp';

/**
 * GET /api/elp/
 * Fetch all elementplacements
 */
export const getAllElp = async (req: Request, res: Response): Promise<void> => {
  try {
    const rows: ElpDB[] = await db(elpTable).select('*');
    console.log('All element placement results', rows);

    const stagePlots = rows.map(elpToApi);
    res.json(stagePlots);
  } catch (err) {
    console.error('Error in getAllElp', err);
    res.status(500).json({ message: 'Unable to fetch all elemnent placements' });
  }
};

/**
 * GET /api/elp/:id
 * Fetch elementplacement by ID
 */

export const getElpById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const placement: ElpDB = await db(elpTable).where({ id_elp: id }).first();

    if (!placement) {
      res.status(404).json({
        error: 'No elp with that Id',
      });
    }

    res.json(elpToApi(placement));
  } catch (error) {
    console.error('Unable to fetch element placment', error);
  }
};

/**
 * POST /api/elp
 * Create element placement
 */
export const createElp = async (req: Request, res: Response): Promise<void> => {
  try {
    const dbData = elpToDb(req.body);

    if (!dbData.id_stp_elp || !dbData.id_elt_elp) {
      res.status(400).json({
        error: 'Missing required fields: stagePlotId and elementTypeId',
      });
      return;
    }

    const [newPlacement] = await db('element_placement_elp').insert(dbData).returning('*');

    res.status(201).json({
      newPlacement: elpToApi(newPlacement),
      message: "new placement made"
    });

  } catch (error) {
    console.error('Error creating element placement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * PUT /api/elp/:id
 * Update element placement
 */
export const updateElp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dbData = elpToDb(req.body);

    console.log('Request body: ', req.body);
    console.log('Transformed dbData: ', dbData);

    const [updated] = await db(elpTable).where({ id_elp: id }).update(dbData).returning('*');

    if (!updated) {
      res.status(404).json({ error: 'Element placement not found' });
      return;
    }

    res.json(elpToApi(updated));
  } catch (error) {
    console.error('Error updating element placement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * DELETE /api/elp/:id
 * delete element placement by id
 */

export const deleteElp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const exists = await db(elpTable)
      .select('*')
      .where({
        id_elp: id,
      })
      .first();

    if (!exists) {
      res.status(404).json({
        message: 'There is no element placement with that ID',
      });
    }

    const [results]: ElpDB[] = await db(elpTable)
      .delete()
      .where({
        id_elp: id,
      })
      .returning('*');

    res.json(elpToApi(results));
  } catch (error) {
    console.error('Error deleting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
