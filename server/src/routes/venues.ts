import {Router} from 'express';
import { getAllVenues, getVenueById } from '../controllers/venueController';

const venueRouter = Router();

venueRouter.get('/', getAllVenues);
venueRouter.get('/:id', getVenueById);

export default venueRouter;
