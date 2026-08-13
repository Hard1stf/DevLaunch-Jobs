import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

// custom interface.
export interface AuthTokenPayload {
  userId: string;
  role: 'candidate' | 'recruiter';
}

export const generateToken = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
};
