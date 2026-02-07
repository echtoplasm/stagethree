import { Router } from 'express';
import { getAllCountries } from '../controllers/countryController';

const countryRouter = Router();

countryRouter.get('/', getAllCountries);

export default countryRouter;
