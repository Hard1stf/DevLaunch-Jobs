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

    res
      .status(200)
      .cookie('accessToken', user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json(new APIResponse(user.user, 'Login successful'));
  } catch (error) {
    next(error);
  }
};
