import { Request, Response } from 'express';
import { LoginRequest } from '../types/api';
import { type AuthRequest } from '../middleware/auth';
import { UserDB, dbUserToApi, apiUserToDb } from '../utils/transformers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/knex';

/**
 * POST /api/auth/login
 * Authenticates a user by email and password.
 * Verifies the bcrypt password hash, signs a JWT, and sets it as an httpOnly cookie.
 * Responds with sanitized user data on success, or 401 on invalid credentials.
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: LoginRequest = req.body;

    // Fetch user by email (DB format)
    const user: UserDB | undefined = await db('user_usr').where({ email_usr: email }).first();

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash_usr);

    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate JWT with clean data
    const apiUser = dbUserToApi(user);
    const token = jwt.sign(
      {
        userId: apiUser.id,
        email: apiUser.email,
        roleId: apiUser.roleId,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '2h',
      }
    );

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
        roleId: apiUser.roleId,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * POST /api/auth/signout
 * Clears the JWT cookie and ends the user session.
 */

export const logOutUser = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('token');
  res.json({ message: 'logged out successfully' });
};

/**
 * GET /api/auth/me
 * Returns the authenticated user's profile data based on the userId extracted from the JWT.
 * Intended for session rehydration on client load.
 */

export const authenticateMe = async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await db('user_usr').select('*').where('id_usr', req.user?.userId).first();

  const apiUser = dbUserToApi(user);
  res.json({ apiUser });
};
