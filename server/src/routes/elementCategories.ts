import { Router } from 'express';
import { getAllElementCategories } from '../controllers/elementCategories';

const elementCategoriesRouter = Router();

elementCategoriesRouter.get('/', getAllElementCategories);

export default elementCategoriesRouter;
