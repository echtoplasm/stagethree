import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const ADMIN_ROLE_ID = 2;

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
    roleId: number;
  };
}

/**
 * Middleware for protecting routes via JWT authentication and role-based access control.
 * Tokens are read from the httpOnly cookie set during login.
 */

/**
 * Verifies the JWT from the request cookie and attaches the decoded user payload to req.user.
 * Responds 401 if the token is missing, invalid, or expired.
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
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }
};

/**
 * Guards admin-only routes by verifying the authenticated user's roleId meets the minimum threshold.
 * Responds 403 if the user is unauthenticated or has insufficient role privileges.
 */
export const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.roleId < ADMIN_ROLE_ID) {
    res.status(403).json({ error: 'Forbidden' });
  }

  next();
};
