import 'dotenv/config';

console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('JWT_SECRET', process.env.JWT_SECRET);

import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/users';
import stageRoutes from './routes/stage';
import projectRoutes from './routes/projects';
import venueRoutes from './routes/venues';
import equipmentRoutes from './routes/equipment';
import stagePlotRoutes from './routes/stageplots';
import elementRoutes from './routes/elements';
import stateRoutes from './routes/states';
import countryRoutes from './routes/countries';
import inputChannelRoutes from './routes/inputChannels';
import elpRoutes from './routes/elementPlacements';
import eqpRoutes from './routes/equipmentPlacements';
import authRoutes from './routes/auth';
import db from './db/knex';

const app = express();
const PORT = 3000;

//MiddleWare//
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

//Routes//
app.use('/api/users', userRoutes);
app.use('/api/stages', stageRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/stageplots', stagePlotRoutes);
app.use('/api/elements', elementRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/inputchannels', inputChannelRoutes);
app.use('/api/elp', elpRoutes);
app.use('/api/eqp', eqpRoutes);
app.use('/api/auth', authRoutes);
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
