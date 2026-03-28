import { Request, Response } from 'express';
import db from '../db/knex';
import { dbImageToApi, apiImageToDb, ImageDB, ImageAPI, ImageWithScaleDB, ImageWithScaleAPI, dbImageWithScaleToApi } from '../utils/transformers';
import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

//S3 client init for r2 communication
export const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

/**
 * GET /api/images
 * get all images/models
 */

export const getAllImages = async (req: Request, res: Response) => {
  try {
    const rows: ImageWithScaleDB[] = await db('image_img')
      .join('element_type_elt', 'id_img_elt', 'id_img')
      .select(
        'id_img',
        'name_img',
        'file_path_img',
        'file_type_img',
        'category_img',
        'created_at_img',
        'default_scale_x_elt',
        'default_scale_y_elt',
        'default_scale_z_elt'
      );

    const apiImg = rows.map(dbImageWithScaleToApi);
    res.json(apiImg);
  } catch (err) {
    console.error('Error in getAllImages', err);
    res.status(500).json({ message: 'Unable to fetch all images' });
  }
};

/**
 * DELETE /api/images/:id
 *
 * delete image by id
 * adding delete s3 command to delete from r2 bucket
 */
export const deleteImageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const image = await db('image_img').where({ id_img: id }).first();

    if (!image) return res.status(404).json({ message: 'image not found' });

    const key = image.file_path_img.split('/').pop();

    await db('image_img').delete().where({ id_img: id });

    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
      })
    );

    res.status(200).json({ message: 'deleted' });
  } catch (err) {
    console.error('error in deleteimagebyId', err);
    res.status(500).json({ message: 'unable to delete image by id' });
  }
};

/**
 * CREATE new image
 * POST /api/images
 *
 * req.body = name, category
 */

export const createNewImage = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'missing one or more required fields' });
    }

    if (!req.file) return res.status(400).json({ error: 'no file provided' });

    const key = `${Date.now()}-${req.file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

    const r2FilePath = `https://pub-${process.env.R2_PUBLIC_DOMAIN}.r2.dev/${key}`;

    await db.transaction(async trx => {
      const [image] = await trx('image_img')
        .insert({
          name_img: name,
          file_path_img: r2FilePath,
          file_type_img: req.file!.mimetype,
        })
        .returning('*');

      await trx('element_type_elt').insert({
        name_elt: name,
        description_elt: description,
        id_img_elt: image.id_img,
        default_color_elt: '#000000',
      });
    });

    res.status(200).json({ message: 'image and element type created' });
  } catch (err) {
    console.error('unable to create new image via createNewImage', err);
    res.status(500).json({ message: 'unable to create new image' });
  }
};

/*
 * CREATE AN IMAGE UPDATE ENDPOINT
 * PATCH /api/images/:id
 */

export const updateImageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, fileType, defaultScaleX, defaultScaleY, defaultScaleZ } = req.body;

    await db.transaction(async trx => {
      await trx('image_img').update({ name_img: name }).where({ id_img: id });

      await trx('element_type_elt')
        .update({
          name_elt: name,
          default_scale_x_elt: defaultScaleX,
          default_scale_y_elt: defaultScaleY,
          default_scale_z_elt: defaultScaleZ,
        })
        .where({ id_img_elt: id });
    });

    res.status(200).json({ message: 'updated' });
  } catch (err) {
    console.error('error in updatingimagebyid', err);
    res.status(500).json({
      message: 'unable to update image by id',
    });
  }
};
