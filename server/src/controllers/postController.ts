import { Request, Response } from 'express';
import pool from '../db/db';

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(`Select * from posts;`);
    console.log('posts result', result);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to fetch all posts' });
  }
};
