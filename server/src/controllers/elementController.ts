import { Request, Response } from 'express';
import db from '../db/knex';
import { dbElementTypeToApi as elementToApi, ElementTypeDB } from '../utils/transformers';

const elemTable = 'element_type_elt';

/**
 * GET /api/elements/
 * Fetch all elements
 */
export const getAllElements = async (req: Request, res: Response): Promise<void> => {
  try {
    const rows = await db('element_type_elt')
      .leftJoin('image_img', 'element_type_elt.id_img_elt', 'image_img.id_img')
      .select('element_type_elt.*', 'image_img.file_path_img');

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
    const equipment: ElementTypeDB | undefined = await db(elemTable).where({ id_elt: id }).first();

    if (!equipment) {
      res.status(404).json({ message: 'equipment not found' });
      return;
    }

    res.json(elementToApi(equipment));
  } catch (error) {
    console.error('Error fetching element by id:', error);
    res.status(500).json({ message: 'Failed to fetch element' });
  }
};


