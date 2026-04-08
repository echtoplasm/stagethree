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
 * Element placement controller — CRUD handlers for stage element placements.
 * All handlers transform between DB column naming (suffix _elp) and API format via elpToApi/elpToDb.
 */


/**
 * GET /api/elp/
 * Returns all element placements.
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
 * Returns a single element placement by ID, or 404 if not found.
 */
export const getElpById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const placement: ElpDB = await db(elpTable).where({ id_elp: id }).first();

    if (!placement) {
      res.status(404).json({
        message: 'No elp with that Id',
      });
      return;
    }

    res.json(elpToApi(placement));
  } catch (error) {
    console.error('Unable to fetch element placment', error);
    res.status(500).json({
      message: 'unable to fetch element placement',
    });
  }
};

/**
 * POST /api/elp
 * Creates a new element placement.
 * Applies per-type default scale overrides for element types 1 and 2.
 * Responds 400 if stagePlotId or elementTypeId are missing.
 */
export const createElp = async (req: Request, res: Response): Promise<void> => {
  try {
    const dbData = elpToDb(req.body);

    if (!dbData.id_stp_elp || !dbData.id_elt_elp) {
      res.status(400).json({
        message: 'Missing required fields: stagePlotId and elementTypeId',
      });
      return;
    }
    
    //crazy hacky way for getting proper scale without refactoring everything
    if(dbData.id_elt_elp == 2){
      dbData.scale_x_elp = '0.175',
      dbData.scale_y_elp = '0.15', 
      dbData.scale_z_elp = '0.175'
    }

    if(dbData.id_elt_elp == 1) {
      dbData.position_y_elp = '0.5'
    }

    const [newPlacement] = await db('element_placement_elp').insert(dbData).returning('*');

    res.status(201).json({
      newPlacement: elpToApi(newPlacement),
      message: 'new placement made',
    });
  } catch (error) {
    console.error('Error creating element placement:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * PUT /api/elp/:id
 * Replaces an element placement by ID, or 404 if not found.
 */
export const updateElp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dbData = elpToDb(req.body);

    console.log('Request body: ', req.body);
    console.log('Transformed dbData: ', dbData);

    const [updated] = await db(elpTable).where({ id_elp: id }).update(dbData).returning('*');

    if (!updated) {
      res.status(404).json({ message: 'Element placement not found' });
      return;
    }

    res.json(elpToApi(updated));
  } catch (error) {
    console.error('Error updating element placement:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * DELETE /api/elp/:id
 * Deletes an element placement by ID, or 404 if not found.
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
      return;
    }

    const [results]: ElpDB[] = await db(elpTable)
      .delete()
      .where({
        id_elp: id,
      })
      .returning('*');

    res.status(200).json({ successfulDelete: true });
  } catch (error) {
    console.error('Error deleting:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * PATCH /api/elp/:id
 * Partially updates an element placement's position (X, Y, Z) by ID, or 404 if not found.
 */
export const partialUpdateElp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;

    const dataDb = elpToDb(data);

    const exists = await db(elpTable)
      .select('*')
      .where({
        id_elp: id,
      })
      .first();

    if (!exists) {
      res.status(404).json({
        message: 'there is no element placement with that id',
      });
      return;
    }

    const [result]: ElpDB[] = await db(elpTable)
      .where({ id_elp: id })
      .update({
        position_x_elp: dataDb.position_x_elp,
        position_y_elp: dataDb.position_y_elp,
        position_z_elp: dataDb.position_z_elp,
      })
      .returning('*');

    const apiResult = elpToApi(result);

    console.log('successfully updated element placement via paritalUpdateElp');

    res.status(200).json({
      message: 'successful element placement update',
      placementUpdate: apiResult,
    });
  } catch (err) {
    res.status(500).json({
      message: 'unable to update element placement',
      error: err,
    });
  }
};
