import { Request, Response } from 'express';
import db from '../db/knex';
import { randomUUID } from 'node:crypto';

import {
  dbStagePlotToApi,
  apiStagePlotToDb,
  StagePlotDB,
  StagePlotAPI,
  dbInputChannelToApi,
  dbStageToApi,
  dbProjectToApi,
  ProjectDB,
  StageDB,
  StageAPI,
  ProjectAPI,
  ImageDB,
} from '../utils/transformers';

const plotTable = 'stage_plot_stp';

/**
 * Stage plot controller — CRUD handlers for stage plot records.
 * Transforms between DB column naming (suffix _stp) and API format via dbStagePlotToApi/apiStagePlotToDb.
 * The getFullStagePlotInfo and getStagePlotByUUID handlers aggregate elements, input channels,
 * stage, and project data into a single response for scene hydration.
 */


/**
 * GET /api/stageplots/
 * Returns all stage plots.
 */
export const getAllStagePlots = async (req: Request, res: Response): Promise<void> => {
  try {
    const rows: StagePlotDB[] = await db(plotTable).select('*');
    console.log('All stage plot results', rows);

    const stagePlots = rows.map(dbStagePlotToApi);
    res.json(stagePlots);
  } catch (err) {
    console.error('Error in getAllStagePlots', err);
    res.status(500).json({ message: 'Unable to fetch all stageplots' });
  }
};

/**
 * GET /api/stageplots/:id
 * Returns a single stage plot by ID, or 404 if not found.
 */

export const getStagePlotById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const plot: StagePlotDB = await db(plotTable).where({ id_stp: id }).first();

    if (!plot) {
      res.status(404).json({
        error: 'No plot with that Id',
      });
    }

    res.json(dbStagePlotToApi(plot));
  } catch (error) {
    console.error('Unable to fetch stage plot by id in fetchStagePlotById', error);
  }
};

/**
 * GET /api/stageplots/projects/:id
 * Returns all stage plots for a given project ID, joined with their stage name.
 */

export const getAllStagePlotsByProjectId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const plots = await db(plotTable)
      .select('stage_plot_stp.*', 'stage_stg.name_stg as stage_name')
      .join('stage_stg', 'stage_plot_stp.id_stg_stp', 'stage_stg.id_stg')
      .where({ id_prj_stp: id });

    const apiPlots = plots.map(plot => ({
      ...dbStagePlotToApi(plot),
      stageName: plot.stage_name,
    }));

    console.log(apiPlots);

    res.json(apiPlots);
  } catch (error) {
    console.error('unable to retrieve stage plots with that project ID', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * POST /api/stageplots
 * Creates a new stage plot with a server-generated UUID for public share links.
 * Responds 400 if projectId, stageId, or name are missing.
 */
export const createStagePlot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId, stageId, name, gigDate } = req.body;

    if (!projectId || !stageId || !name) {
      res.status(400).json({ message: 'Missing one or more required fields' });
      return;
    }

    const stagePlotUUID = crypto.randomUUID();

    //need to insert uuid from crypto
    const plotDbData = apiStagePlotToDb({
      projectId,
      stageId,
      name,
      gigDate,
      stagePlotUUID,
    });

    const [plots]: StagePlotDB[] = await db(plotTable).insert(plotDbData).returning('*');

    res.json(dbStagePlotToApi(plots));
  } catch (error) {
    console.error('unable to createStagePlot', error);
    res.status(404).json({
      message: 'unable to create stage plot',
    });
  }
};

/**
 * PUT /api/stageplots/:id
 * Updates a stage plot's name, project, and stage by ID.
 * Responds 400 if projectId or name are missing.
 */

export const updateStagePlot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { projectId, stageId, name } = req.body;
    if (!projectId || !name) {
      res.status(400).json({ message: 'Missing one or more required fields' });
      return;
    }

    const plotDbData = apiStagePlotToDb({
      projectId,
      stageId,
      name,
    });

    const [results]: StagePlotDB[] = await db(plotTable)
      .update(plotDbData)
      .where({
        id_stp: id,
      })
      .returning('*');

    res.json(dbStagePlotToApi(results));
  } catch (error) {
    console.error('Unable to updated stage plot', error);
    res.status(500).json({
      error: 'Unable to updated stage plot',
    });
  }
};

/**
 * DELETE /api/stageplots/:id
 * Deletes a stage plot by ID, or 404 if not found.
 */

export const deleteStagePlot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const exists = await db(plotTable)
      .select('*')
      .where({
        id_stp: id,
      })
      .first();

    if (!exists) {
      res.status(404).json({
        message: 'There is no stage plot with that ID',
      });
    }

    const [results]: StagePlotDB[] = await db(plotTable)
      .delete()
      .where({
        id_stp: id,
      })
      .returning('*');

    res.json({
      'successfully deleted': dbStagePlotToApi(results),
    });
  } catch (error) {
    console.error('Unable to delete stage plot', error);
    res.status(404).json({
      message: 'Unable to delete stage plot',
    });
  }
};

/**
 * GET /api/stageplots/share/:id
 * Returns the full stage plot configuration by ID for scene hydration.
 * Aggregates element placements (joined with element type and model path),
 * input channels, stage, and project into a single response.
 */
export const getFullStagePlotInfo = async (req: Request, res: Response): Promise<void> => {
  try {

    interface dbElement {
      created_at_elp: string;
      id_elp: number;
      id_elt_elp: number;
      id_stp_elp: number;
      name_elt: string;
      file_path_img: string;
      position_x_elp: string;
      position_y_elp: string;
      position_z_elp: string;
      rotation_x_elp: string;
      rotation_y_elp: string;
      rotation_z_elp: string;
      scale_x_elp: string;
      scale_y_elp: string;
      scale_z_elp: string;
    }

    interface apiElement {
      createdAt: string;
      id: number;
      elementTypeId: number;
      stagePlotId: number;
      name: string;
      filePathImg: string;
      positionX: number;
      positionY: number;
      positionZ: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
      scaleX: number;
      scaleY: number;
      scaleZ: number;
    }

    const dbElementToApi = (dbel: dbElement): apiElement => ({
      createdAt: dbel.created_at_elp,
      id: dbel.id_elp,
      elementTypeId: dbel.id_elt_elp,
      stagePlotId: dbel.id_stp_elp,
      name: dbel.name_elt,
      filePathImg: dbel.file_path_img,
      positionX: parseFloat(dbel.position_x_elp),
      positionY: parseFloat(dbel.position_y_elp),
      positionZ: parseFloat(dbel.position_z_elp),
      rotationX: parseFloat(dbel.rotation_x_elp),
      rotationY: parseFloat(dbel.rotation_y_elp),
      rotationZ: parseFloat(dbel.rotation_z_elp),
      scaleX: parseFloat(dbel.scale_x_elp),
      scaleY: parseFloat(dbel.scale_y_elp),
      scaleZ: parseFloat(dbel.scale_z_elp),
    });

    const { id } = req.params;
    //stageplot to api conversion
    const stagePlot = await db('stage_plot_stp').where('id_stp', id).first();
    if (!stagePlot) {
      res.status(404).json({ error: 'Stage plot not found' });
      return;
    }
    const stagePlotApi = dbStagePlotToApi(stagePlot);

    //input channel api conversion
    const inputChannels = await db('input_channel_inc').where('id_stp_inc', id);
    const inputChannelsApi = inputChannels.map(dbInputChannelToApi);

    //endpoint specific elements to api
    const elements: dbElement[] = await db('element_placement_elp')
      .leftJoin('element_type_elt', 'element_placement_elp.id_elt_elp', 'element_type_elt.id_elt')
      .leftJoin('image_img', 'element_type_elt.id_img_elt', 'image_img.id_img')
      .where('element_placement_elp.id_stp_elp', id)
      .select('element_placement_elp.*', 'element_type_elt.name_elt', 'image_img.file_path_img');

    const apiElements = elements.map(dbElementToApi);

    //Stage data passed to the res.json
    const stage: StageDB = await db('stage_stg').where('id_stg', stagePlot.id_stg_stp).first();
    const stageApi: StageAPI = dbStageToApi(stage);

    const projectId = stagePlotApi.projectId;
    const project: ProjectDB = await db('project_prj').where('id_prj', projectId).first();

    const projectApi: ProjectAPI = dbProjectToApi(project);
    res.json({
      stagePlot: stagePlotApi,
      inputChannels: inputChannelsApi,
      elements: apiElements,
      stage: stageApi,
      project: projectApi,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * GET /api/stageplots/share/:uuid
 * Returns the full stage plot configuration by public UUID for unauthenticated share link access.
 * Aggregates element placements, input channels, stage, and project into a single response.
 */
export const getStagePlotByUUID = async (req: Request, res: Response): Promise<void> => {
  try {
    /**
     * Wrote these specific type conversions since this endpoint is using data
     * that is extremely use case specific and very unlikely that data will be
     * returned and formatted like this elsewhere
     *
     */
    interface dbElement {
      created_at_elp: string;
      id_elp: number;
      id_elt_elp: number;
      id_stp_elp: number;
      uuid_stp: string;
      name_elt: string;
      file_path_img: string;
      position_x_elp: string;
      position_y_elp: string;
      position_z_elp: string;
      rotation_x_elp: string;
      rotation_y_elp: string;
      rotation_z_elp: string;
      scale_x_elp: string;
      scale_y_elp: string;
      scale_z_elp: string;
    }

    interface apiElement {
      createdAt: string;
      id: number;
      elementTypeId: number;
      stagePlotId: number;
      stagePlotUUID: string;
      name: string;
      filePathImg: string;
      positionX: number;
      positionY: number;
      positionZ: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
      scaleX: number;
      scaleY: number;
      scaleZ: number;
    }

    const dbElementToApi = (dbel: dbElement): apiElement => ({
      createdAt: dbel.created_at_elp,
      id: dbel.id_elp,
      elementTypeId: dbel.id_elt_elp,
      stagePlotId: dbel.id_stp_elp,
      stagePlotUUID: dbel.uuid_stp,
      name: dbel.name_elt,
      filePathImg: dbel.file_path_img,
      positionX: parseFloat(dbel.position_x_elp),
      positionY: parseFloat(dbel.position_y_elp),
      positionZ: parseFloat(dbel.position_z_elp),
      rotationX: parseFloat(dbel.rotation_x_elp),
      rotationY: parseFloat(dbel.rotation_y_elp),
      rotationZ: parseFloat(dbel.rotation_z_elp),
      scaleX: parseFloat(dbel.scale_x_elp),
      scaleY: parseFloat(dbel.scale_y_elp),
      scaleZ: parseFloat(dbel.scale_z_elp),
    });

    const { uuid } = req.params;
    //stageplot to api conversion
    const stagePlot = await db('stage_plot_stp').where('uuid_stp', uuid).first();
    if (!stagePlot) {
      res.status(404).json({ error: 'Stage plot not found' });
      return;
    }
    const stagePlotApi = dbStagePlotToApi(stagePlot);

    //input channel api conversion
    const inputChannels = await db('input_channel_inc').where('id_stp_inc', stagePlot.id_stp);
    const inputChannelsApi = inputChannels.map(dbInputChannelToApi);

    //endpoint specific elements to api
    const elements: dbElement[] = await db('element_placement_elp')
      .leftJoin('element_type_elt', 'element_placement_elp.id_elt_elp', 'element_type_elt.id_elt')
      .leftJoin('image_img', 'element_type_elt.id_img_elt', 'image_img.id_img')
      .where('element_placement_elp.id_stp_elp', stagePlot.id_stp)
      .select('element_placement_elp.*', 'element_type_elt.name_elt', 'image_img.file_path_img');

    const apiElements = elements.map(dbElementToApi);

    //Stage data passed to the res.json
    const stage: StageDB = await db('stage_stg').where('id_stg', stagePlot.id_stg_stp).first();
    const stageApi: StageAPI = dbStageToApi(stage);

    const projectId = stagePlotApi.projectId;
    const project: ProjectDB = await db('project_prj').where('id_prj', projectId).first();

    const projectApi: ProjectAPI = dbProjectToApi(project);
    res.json({
      stagePlot: stagePlotApi,
      inputChannels: inputChannelsApi,
      elements: apiElements,
      stage: stageApi,
      project: projectApi,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * GET /api/stageplots/user/:id
 * Returns all stage plots belonging to a given user ID via their associated projects.
 */
export const getAllStagePlotsByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const stagePlots = await db('stage_plot_stp as stp')
      .join('project_prj as prj', 'prj.id_prj', 'stp.id_prj_stp')
      .select('stp.*')
      .where('prj.id_usr_prj', id);

    const stagePlotsApi = stagePlots.map(dbStagePlotToApi);

    res.status(200).json(stagePlotsApi);
  } catch (err) {
    console.log('error in getAllStagePlotsByUserId', err);
    res.status(500).json({
      error: err,
    });
  }
};
