import {Router} from 'express';
import { getAllElp, getElpById, deleteElp, createElp, updateElp, partialUpdateElp } from '../controllers/elementPlacementController';

const elpRouter = Router();

elpRouter.get('/', getAllElp);
elpRouter.get('/:id', getElpById);
elpRouter.delete('/:id', deleteElp);
elpRouter.post('/', createElp);
elpRouter.put('/:id', updateElp);
elpRouter.patch('/:id', partialUpdateElp)

export default elpRouter;
