import { Request, Response } from 'express';
import { LoginRequest } from '../types/api';
import { UserDB, dbUserToApi, apiUserToDb } from '../utils/transformers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/knex';

/**
 * POST /api/auth/login
 * Authenticate a user
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: LoginRequest = req.body;

    // Fetch user by email (DB format)
    const user: UserDB | undefined = await db('user_usr').where({ email_usr: email }).first();

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash_usr);

    if (isValidPassword) {
      console.log('isValidPassword:', isValidPassword);
    }

    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate JWT with clean data
    const apiUser = dbUserToApi(user);
    const token = jwt.sign({ userId: apiUser.id, email: apiUser.email }, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    // Return clean user data
    res.json({
      user: {
        id: apiUser.id,
        email: apiUser.email,
        firstName: apiUser.firstName,
        lastName: apiUser.lastName,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/auth/signout
 * logs the user out
 */

export const logOutUser = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('token');
  res.json({ message: 'logged out successfully' });
};

/**
 * GET /api/auth/me
 * authenticate the user to see if they have a token
 */

export const authenticateMe = async(req: Request, res: Response): Promise<void> => {
  const user = await db('user_usr')
    .select('*')
    .where('id_usr', req.user.userId)
    .first();

  const apiUser = dbUserToApi(user);
  res.json({ apiUser });
}
