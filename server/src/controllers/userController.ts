import { Request, Response } from 'express';
import { LoginRequest } from '../types/api';
import { UserDB, dbUserToApi, apiUserToDb } from '../utils/transformers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/knex';

/**
 * GET /api/users
 * Fetch all users
 */
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const rows: UserDB[] = await db('user_usr').select('*');
    const users = rows.map(dbUserToApi);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

/**
 * GET /api/users/:id
 * Fetch a single user by ID
 */
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user: UserDB | undefined = await db('user_usr').where({ id_usr: id }).first();

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(dbUserToApi(user));
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

/**
 * POST /api/users
 * Create a new user
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({ error: 'Email, password, first name, and last name are required' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Transform API data to DB format
    const dbData = apiUserToDb({
      email,
      firstName,
      lastName,
    });

    // Add hashed password (not in transformer since it's auth-specific)
    const insertData = {
      ...dbData,
      password_hash_usr: hashedPassword,
    };

    const [result]: UserDB[] = await db('user_usr').insert(insertData).returning('*');

    res.status(201).json(dbUserToApi(result));
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

/**
 * PUT /api/users/:id
 * Update a user (full update)
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName, isActive, roleId } = req.body;

    // Check if user exists
    const exists = await db('user_usr').where({ id_usr: id }).first();
    if (!exists) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Transform API data to DB format
    const updates = apiUserToDb({ email, firstName, lastName, isActive, roleId });

    // Only update if there are fields to update
    if (Object.keys(updates).length === 0) {
      res.status(400).json({ error: 'No valid fields to update' });
      return;
    }

    const [result]: UserDB[] = await db('user_usr')
      .where({ id_usr: id })
      .update(updates)
      .returning('*');

    res.json(dbUserToApi(result));
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

/**
 * PATCH /api/users/:id
 * Partially update a user
 */
export const patchUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if user exists
    const exists = await db('user_usr').where({ id_usr: id }).first();
    if (!exists) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Transform whatever fields were sent
    const updates = apiUserToDb(req.body);

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ error: 'No valid fields to update' });
      return;
    }

    const [result]: UserDB[] = await db('user_usr')
      .where({ id_usr: id })
      .update(updates)
      .returning('*');

    res.json(dbUserToApi(result));
  } catch (error) {
    console.error('Error patching user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

/**
 * DELETE /api/users/:id
 * Delete a user
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await db('user_usr').where({ id_usr: id }).del();

    if (deleted === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({
      message: "User successfully deleted", 
      userDeleted: `${deleted}`
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};


