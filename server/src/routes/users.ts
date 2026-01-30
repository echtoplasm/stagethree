import { Router } from 'express';
import { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser, 
  loginUser
} from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

//GET USER ROUTES//
//These need to be admin only routes
router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);

//POST ROUTES//
//These will be accessible to any user
router.post('/register', createUser);
router.post('/signin', loginUser)

//PUT ROUTE//
//Available to admin and user
router.put('/:id', authenticateToken, updateUser);

//DELETE ROUTE//
router.delete('/:id', authenticateToken ,deleteUser);

export default router;
