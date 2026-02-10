import {Router} from 'express';
import { getAllVenues, getVenueById, createVenue, deleteVenue } from '../controllers/venueController';

const venueRouter = Router();

venueRouter.get('/', getAllVenues);
venueRouter.get('/:id', getVenueById);
venueRouter.post('/', createVenue);
venueRouter.delete('/:id', deleteVenue);

export default venueRouter;
