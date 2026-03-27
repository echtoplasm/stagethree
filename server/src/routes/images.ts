import { Router } from 'express';
import { deleteImageById, getAllImages, createNewImage } from '../controllers/imageController';
import multer from 'multer';

const imgRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });
imgRouter.get('/', getAllImages);
imgRouter.delete('/:id', deleteImageById);
imgRouter.post('/', upload.single('file'), createNewImage)
export default imgRouter;
