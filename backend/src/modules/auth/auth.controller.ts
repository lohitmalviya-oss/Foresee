import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/env';
import { AppError } from '../../middleware/errorMiddleware';

// Fix: Use 'any' for req and res to resolve property missing errors (body, status) in the current environment
export const register = async (req: any, res: any, next: NextFunction) => {
  try {
    const { username, phone } = req.body;
    
    // Mock user creation
    const userId = 'user_' + Math.random().toString(36).substr(2, 9);
    
    const token = jwt.sign({ id: userId, role: 'user' }, config.jwtSecret, {
      expiresIn: '30d',
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: { id: userId, username, phone },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Fix: Use 'any' for req and res to resolve property missing errors (body, status) in the current environment
export const login = async (req: any, res: any, next: NextFunction) => {
  try {
    const { phone, otp } = req.body;
    
    // Mock OTP verification
    if (otp !== '123456') {
      throw new AppError(401, 'Invalid OTP');
    }

    const userId = 'user_mock_123';
    const token = jwt.sign({ id: userId, role: 'user' }, config.jwtSecret, {
      expiresIn: '30d',
    });

    res.status(200).json({
      status: 'success',
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};