import {Router} from 'express';
import { getAllElp, getElpById, deleteElp, createElp, updateElp } from '../controllers/elementPlacementController';

const elpRouter = Router();

elpRouter.get('/', getAllElp);
elpRouter.get('/:id', getElpById);
elpRouter.delete('/:id', deleteElp);
elpRouter.post('/', createElp);
elpRouter.put('/:id', updateElp);

export default elpRouter;
