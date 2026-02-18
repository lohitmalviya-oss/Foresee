import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { AppError } from './errorMiddleware';

// Fix: Ensure AuthRequest extends the correct Request type, although it's often shadowed by global types in this environment
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

// Fix: Use 'any' for req to resolve property access issues (headers, body) and ensure compatibility with the Express router
export const protect = (req: any, res: Response, next: NextFunction) => {
  // Accessing headers from the correctly typed Express Request object
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new AppError(401, 'Not authorized, no token'));
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as any;
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    return next(new AppError(401, 'Not authorized, token failed'));
  }
};