import { Request, Response } from 'express';
import db from '../db/knex';
import { dbImageToApi, apiImageToDb, ImageDB, ImageAPI } from '../utils/transformers';
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
    const rows: ImageDB[] = await db('image_img').select('*');
    const apiImg = rows.map(dbImageToApi);
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
    const { name, category } = req.body;

    const data = { name, category };

    const dbData = apiImageToDb(data);

    if (!name || !category) {
      return res.status(400).json({ message: 'missing one or more required fields' });
    }

    if (!req.file) return res.status(400).json({ error: 'no file provided' });

    const key = `${Date.now()}-${req.file.originalname}`;
    console.log('bucket:', process.env.R2_BUCKET_NAME);
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

    const r2FilePath = `https://pub-${process.env.R2_PUBLIC_DOMAIN}.r2.dev/${key}`;

    const id = await db('image_img')
      .insert({
        name_img: dbData.name_img,
        category_img: dbData.category_img,
        file_path_img: r2FilePath,
        file_type_img: req.file.mimetype,
      })
      .returning('*');

    res.json({ id, r2FilePath });
  } catch (err) {
    console.error('unable to create new image via creatNewImage', err);
    res.status(500).json({
      message: 'unable to create new image',
    });
  }
};
