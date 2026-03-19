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
        message: 'No plot with that Id',
      });
    }

    res.json(incToApi(plot));
  } catch (error) {
    console.error('Unable to fetch input channel by id in fetchInputChannelById', error);
    res.status(500).json({
      message: 'internal server error',
    });
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
    res.status(500).json({
      message: 'internal server error',
    });
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
      message: 'Unable to updated input channel',
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
  } catch (error) {
    console.error('unable to delete input channel');
    res.status(500).json({
      message: 'internal server error, unable to delete input channel',
    });
  }
};

/**
 *  GET /api/inputchannels/stageplot/:id
 *  get inputchannel by stage plot id
 */

export const getInputChannelByStagePlotId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const results: InputChannelDB[] = await db(incTable).select('*').where({
      id_stp_inc: id,
    });

    res.json(results.map(incToApi));
  } catch (err) {
    console.error('Unable to get inc by stage plot id', err);
    res.status(500).json({
      message: 'unable to get inc by stage plot id',
    });
  }
};

/**
 * PATCH /api/inputchannels/:inputChannelId
 * partial update to inputchannels for changing the inputchannelnumber
 */

export const partialUpdateInputChannel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const dbData = incToDb(req.body);

    const [result]: InputChannelDB[] = await db(incTable)
      .where('id_inc', id)
      .update(dbData)
      .returning('*');

    if (!result) {
      res.status(404).json({
        message: 'input channel not found',
      });
      return;
    }

    const apiResult = incToApi(result);
    res.status(200).json(apiResult);
  } catch (err) {
    console.error('unable to partially update input channel', err);
    res.status(500).json({
      message: 'unable to partially update input channel',
      error: err,
    });
  }
};
