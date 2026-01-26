import 'dotenv/config';

console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

import express, { Request, Response } from 'express';
import pool from './db/db';
import cors from 'cors';

import userRoutes from './routes/users';
import postRoutes from './routes/posts';
import stageRoutes from './routes/stage';
import db from './db/knex';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/stages', stageRoutes);

/*
if (process.env.NODE_ENV === 'production') {
  db.migrate
    .latest()
    .then(() => console.log('Migrations Complete'))
    .catch(err => {
      console.error('Migration failed: ', err);
      process.exit(1);
    });
}
*/
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello Typescript Express' });
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
