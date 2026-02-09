import {Router} from 'express';
import { getAllEqp, getEqpById, deleteEqp, createEqp, updateEqp } from '../controllers/equipmentPlacementController';

const eqpRouter = Router();

eqpRouter.get('/', getAllEqp);
eqpRouter.get('/:id', getEqpById);
eqpRouter.delete('/:id', deleteEqp);
eqpRouter.post('/', createEqp);
eqpRouter.put('/:id', updateEqp);

export default eqpRouter;
