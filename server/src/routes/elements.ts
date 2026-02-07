import {Router} from 'express';
import { getAllElements, getElementById } from '../controllers/elementController';

const elementRouter = Router();

elementRouter.get('/', getAllElements);
elementRouter.get('/:id', getElementById);

export default elementRouter;
