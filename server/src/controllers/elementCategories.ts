import { Request, Response } from 'express';
import db from '../db/knex';
import { ElementCategoryDB, dbElementCategoryToApi } from '../utils/transformers';

/**
 * Fetches all element categories from the database and returns them as API-shaped objects.
 *
 * @param req - Express request object.
 * @param res - Express response object. Returns a 200 with the category array on success,
 *              or a 500 on failure.
 */
export const getAllElementCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories: ElementCategoryDB[] = await db('element_category_emc').select('*');
    const catToApi = categories.map(dbElementCategoryToApi);
    res.status(200).json(catToApi);
  } catch (error) {
    res.status(500).json('unable to fetch all categories');
  }
};
