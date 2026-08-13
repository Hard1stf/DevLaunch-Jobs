import type { Response, Request, NextFunction } from 'express';
import { loginSchema, registerSchema } from '../validators/auth.validator.js';
import { loginUser, registerUser } from '../services/auth.service.js';
import { APIError } from '../utils/APIError.js';
import { APIResponse } from '../utils/APIResponse.js';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      throw new APIError(
        400,
        result.error.issues[0]?.message ?? 'Invalid request data',
      );
    }

    const user = await registerUser(result.data);

    res.status(201).json(new APIResponse(user, 'User register successfully'));
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      throw new APIError(
        400,
        result.error.issues[0]?.message ?? 'Invalid request data',
      );
    }

    const user = await loginUser(result.data);

    res.status(200).json(new APIResponse(user, 'Login successful'));
  } catch (error) {
    next(error);
  }
};
