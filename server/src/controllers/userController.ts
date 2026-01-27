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
    const { email_usr, password_hash_usr, first_name_usr, last_name_usr } = req.body;
    
    if (!email_usr || !password_hash_usr || !first_name_usr || !last_name_usr) {
      res.status(400).json({ error: 'Email, password, first name, and last name are required' });
      return;
    }
    
    const [user] = await db('user_usr')
      .insert({
        email_usr,
        password_hash_usr: password_hash_usr, // Should hash this with bcrypt
        first_name_usr,
        last_name_usr
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
    const { email_usr, first_name_usr, last_name_usr, is_active_usr } = req.body;
    
    const updateData: any = {};
    if (email_usr) updateData.email_usr = email_usr;
    if (first_name_usr) updateData.first_name_usr = first_name_usr;
    if (last_name_usr) updateData.last_name_usr = last_name_usr;
    if (is_active_usr !== undefined) updateData.is_active_usr = is_active_usr;
    
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
