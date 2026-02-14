import { loginUser, logOutUser, authenticateMe } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { Router } from 'express';

const authRouter = Router();
authRouter.post('/signin', loginUser);
authRouter.post('/signout', logOutUser);
authRouter.post('/me', authenticateToken, authenticateMe);

export default authRouter;
