import { Router } from 'express';
import { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser, 

} from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

//GET USER ROUTES//
router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);

//POST ROUTES//
router.post('/register', createUser);


//PUT ROUTE//
router.put('/:id', authenticateToken, updateUser);

//DELETE ROUTE//
router.delete('/:id', authenticateToken ,deleteUser);

export default router;
