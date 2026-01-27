import { Request, Response } from 'express';
import db from '../db/knex';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await db('user_usr')
      .select('id_usr', 'email_usr', 'first_name_usr', 'last_name_usr', 'is_active_usr', 'created_at_usr');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await db('user_usr')
      .select('id_usr', 'email_usr', 'first_name_usr', 'last_name_usr', 'is_active_usr', 'created_at_usr')
      .where('id_usr', id)
      .first();
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, first_name, last_name } = req.body;
    
    if (!email || !password || !first_name || !last_name) {
      res.status(400).json({ error: 'Email, password, first name, and last name are required' });
      return;
    }
    
    const [user] = await db('user_usr')
      .insert({
        email_usr: email,
        password_hash_usr: password, // Should hash this with bcrypt
        first_name_usr: first_name,
        last_name_usr: last_name
      })
      .returning(['id_usr', 'email_usr', 'first_name_usr', 'last_name_usr', 'created_at_usr']);
    
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { email, first_name, last_name, is_active } = req.body;
    
    const updateData: any = {};
    if (email) updateData.email_usr = email;
    if (first_name) updateData.first_name_usr = first_name;
    if (last_name) updateData.last_name_usr = last_name;
    if (is_active !== undefined) updateData.is_active_usr = is_active;
    
    const [user] = await db('user_usr')
      .where('id_usr', id)
      .update(updateData)
      .returning(['id_usr', 'email_usr', 'first_name_usr', 'last_name_usr', 'is_active_usr']);
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await db('user_usr')
      .where('id_usr', id)
      .del();
    
    if (deleted === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
