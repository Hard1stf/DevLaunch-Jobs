import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from './auth.middleware.js';
import { APIError } from '../utils/APIError.js';

type UserRoles = 'candidate' | 'recruiter';

export const authorizeRole = (...allowedRoles: UserRoles[]) => {
  return (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      next(new APIError(401, 'Authentication Required'));
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(new APIError(403, 'Access Forbidden'));
      return;
    }

    next();
  };
};
