import {Router} from 'express';
import { getAllVenues, getVenueById, createVenue } from '../controllers/venueController';

const venueRouter = Router();

venueRouter.get('/', getAllVenues);
venueRouter.get('/:id', getVenueById);
venueRouter.post('/', createVenue);

export default venueRouter;
