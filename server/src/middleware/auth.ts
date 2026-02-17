import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const ADMIN_ROLE_ID = 2;

interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
    roleId: number;
  };
}

/**
 * Authenticate the users token in order enable protected routes
 *
 * @param req - request of type AuthRequest that has extended Express Req
 * @param res - response to the user 
 * @param next - function to be passed next
 */
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
      email: string;
      roleId: number;
    };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
    return;
  }
};

/**
 * @param req - 
 * @param res - 
 * @param next - 
 */
export const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.roleId !== ADMIN_ROLE_ID) {
    res.status(403).json({ error: 'Forbidden' });
  }

  next();
};
