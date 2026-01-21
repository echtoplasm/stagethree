import express, { Request, Response } from 'express';
import pool from './db/db';
import cors from 'cors';

import userRoutes from './routes/users';
import postRoutes from './routes/posts';
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello Typescript Express' });
});

interface User {
  id: number;
  name: string;
  email: string;
}

//USERS TABLE//
//post for user creation
app.post('/users', (req: Request, res: Response) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body cannot be empty' });
  }

  res.status(201).json({
    message: 'Data successfully recieved and processed',
    data: req.body,
  });
});

//get for retrieving all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('select * from users');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
