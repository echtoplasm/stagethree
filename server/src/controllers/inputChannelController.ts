import { Request, Response } from 'express';
import db from '../db/knex';
import {
  dbInputChannelToApi as incToApi,
  apiInputChannelToDb as incToDb,
  InputChannelDB,
  InputChannelAPI,
} from '../utils/transformers';

const incTable = 'input_channel_inc';

/**
 * GET /api/inputchannels/
 * Fetch all inputchannels
 */
export const getAllInputChannels = async (req: Request, res: Response): Promise<void> => {
  try {
    const rows: InputChannelDB[] = await db(incTable).select('*');
    console.log('All input channel results', rows);

    const inputchannels = rows.map(incToApi);
    res.json(inputchannels);
  } catch (err) {
    console.error('Error in getAllInputChannels', err);
    res.status(500).json({ message: 'Unable to fetch all inputchannels' });
  }
};

/**
 * GET /api/inputchannels/:id
 * Fetch inputChannel by ID
 */

export const getInputChannelById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const plot: InputChannelDB = await db(incTable).where({ id_inc: id }).first();

    if (!plot) {
      res.status(404).json({
        error: 'No plot with that Id',
      });
    }

    res.json(incToApi(plot));
  } catch (error) {
    console.error('Unable to fetch input channel by id in fetchInputChannelById', error);
  }
};

/**
 * POST /api/inputchannels
 * Create inputChannel
 *
 */

export const createInputChannel = async (req: Request, res: Response): Promise<void> => {
  try {
    const incDbData = incToDb(req.body);

    const [inputChannel]: InputChannelDB[] = await db(incTable).insert(incDbData).returning('*');

    res.json(incToApi(inputChannel));
  } catch (error) {
    console.error('unable to createInputChannel', error);
  }
};

/**
 * PUT /api/inputchannels/:id
 * updated inputChannel by id
 */

export const updateInputChannel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const incDbData = incToDb(req.body);

    const [results]: InputChannelDB[] = await db(incTable)
      .update(incDbData)
      .where({
        id_inc: id,
      })
      .returning('*');

    res.json(incToApi(results));
  } catch (error) {
    console.error('Unable to updated input channel', error);
    res.status(500).json({
      error: 'Unable to updated input channel',
    });
  }
};

/**
 * DELETE /api/inputchannels/:id
 * delete inputChannel by id
 */

export const deleteInputChannel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const exists = await db(incTable)
      .select('*')
      .where({
        id_inc: id,
      })
      .first();

    if (!exists) {
      res.status(404).json({
        message: 'There is no input channel with that ID',
      });
    }

    const [results]: InputChannelDB[] = await db(incTable)
      .delete()
      .where({
        id_inc: id,
      })
      .returning('*');

    res.json(incToApi(results));
  } catch (error) {}
};
