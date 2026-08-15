import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { APIError } from '../utils/APIError.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: 'candidate' | 'recruiter';
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) throw new APIError(401, 'Authentication required');

    const decoded = jwt.verify(token, env.jwtSecret);

    if (
      typeof decoded !== 'object' ||
      !decoded ||
      typeof decoded.userId !== 'string' ||
      (decoded.role !== 'candidate' && decoded.role !== 'recruiter')
    ) {
      throw new APIError(401, 'Invalid authentication token');
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
      return;
    }
    next(new APIError(401, 'Invalid or expired authentication token'));
  }
};
