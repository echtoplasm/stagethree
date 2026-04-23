import { Request, Response } from 'express';
import db from '../db/knex';
import { ElementCategoryDB, dbElementCategoryToApi } from '../utils/transformers';

export const getAllElementCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories: ElementCategoryDB[] = await db('element_category_emc').select('*');
    const catToApi = categories.map(dbElementCategoryToApi);
    res.status(200).json(catToApi);
  } catch (error) {
    res.status(500).json('unable to fetch all categories');
  }
};
