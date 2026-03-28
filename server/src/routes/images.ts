import { Router } from 'express';
import {
  deleteImageById,
  getAllImages,
  createNewImage,
  updateImageById,
} from '../controllers/imageController';
import multer from 'multer';

const imgRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });
imgRouter.get('/', getAllImages);
imgRouter.post('/', upload.single('file'), createNewImage);
imgRouter.delete('/:id', deleteImageById);
imgRouter.patch('/:id', updateImageById);
export default imgRouter;
