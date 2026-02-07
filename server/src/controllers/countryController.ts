import { Request, Response } from 'express';
import { CountryDB, CountryAPI, apiCountryToDb, dbCountryToApi } from '../utils/transformers';
import db from '../db/knex';

const countryTable = 'country_cty';

/**
 * GET /api/countries
 * Get all countries for a dropdown
 */
export const getAllCountries = async (req: Request, res: Response): Promise<void> => {
  try {
    const [results]: CountryDB[] = await db(countryTable).select('*');
    res.json(dbCountryToApi(results));
  } catch (err) {
    console.error('unable to get all countries', err);
  }
};
