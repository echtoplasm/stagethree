import { Request, Response } from 'express';
import db from '../db/knex';
import { dbVenueToApi, apiVenueToDb, VenueDB, VenueAPI } from '../utils/transformers';

const venueTable = 'venue_ven';

/**
 * GET /api/venues/
 * Fetch all venues
 */
export const getAllVenues = async (req: Request, res: Response): Promise<void> => {
  console.log('getAllStages called');
  try {
    const rows: VenueDB[] = await db(venueTable).select('*');
    console.log('venues result', rows);

    const venues = rows.map(dbVenueToApi);
    res.json(venues);
  } catch (err) {
    console.error('Error in getAllVenues', err);
    res.status(500).json({ message: 'Unable to fetch all venues' });
  }
};

/**
 * GET /api/venue/:id
 * Fetch a single venue by ID
 */
export const getVenueById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const venue: VenueDB | undefined = await db(venueTable).where({ id_ven: id }).first();

    if (!venue) {
      res.status(404).json({ error: 'stage not found' });
      return;
    }

    res.json(dbVenueToApi(venue));
  } catch (error) {
    console.error('Error fetching venue:', error);
    res.status(500).json({ error: 'Failed to fetch venue' });
  }
};

/**
 * POST /api/equipment/
 * create a new venue
 *
 *
 */
export const createVenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address, city, countryId, stateId, capacity, createdBy } = req.body;

    if (!name || !address || !city || !countryId || !stateId || !capacity) {
      res.status(401).json({
        error: 'Missing one of required fields',
      });
    }

    const dbVenueData = apiVenueToDb({
      name,
      address,
      city,
      countryId,
      stateId,
      capacity,
      createdBy,
    });

    const [result]: VenueDB[] = await db(venueTable).insert(dbVenueData).returning('*');

    res.status(201).json(dbVenueToApi(result));
  } catch (error) {
    console.error('Error in the createVenue POST method ', error);
  }
};

/**
 * DELETE /api/venue/:id
 * delete a venue
 */

export const deleteVenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const [result]: VenueDB[] = await db(venueTable)
      .where({
        id_ven: id,
      })
      .delete()
      .returning('*');

    res.json(dbVenueToApi(result));
  } catch (err) {
    console.error('Error in deleting venue', err);
    res.status(500).json({
      message: 'unable to delete venue',
    });
  }
};

/**
 * GET /api/venue/user/:userId
 * get venues by user id
 */

export const getVenuesByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const results: VenueDB[] = await db(venueTable).where({
      created_by_ven: userId,
    });

    const apiResults = results.map(dbVenueToApi);

    res.status(200).json(apiResults);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'unable to fetch all venues by user id'
    })
  }
};
