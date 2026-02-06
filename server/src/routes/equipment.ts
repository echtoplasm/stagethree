import {Router} from 'express';
import { getAllEquipment, getEquipmentById } from '../controllers/equipmentController';

const equipmentRouter = Router();

equipmentRouter.get('/', getAllEquipment);
equipmentRouter.get('/:id', getEquipmentById);

export default equipmentRouter;
