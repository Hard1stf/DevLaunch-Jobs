import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { updateProfileSchema } from '../validators/user.validator.js';
import {
  getCurrentUser,
  updateCurrentUserProfile,
} from '../services/user.service.js';
import { APIResponse } from '../utils/APIResponse.js';

export const getCurrentUserController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const user = await getCurrentUser(userId);

    res
      .status(200)
      .json(new APIResponse(user, 'User profile fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const updateCurrentUserController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const result = updateProfileSchema.parse(req.body);

    const user = await updateCurrentUserProfile(userId, result);
    res
      .status(200)
      .json(new APIResponse(user, 'User profile updated successfully'));
  } catch (error) {
    next(error);
  }
};
