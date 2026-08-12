import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['candidate', 'recruiter']),
});

export const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(1, 'password is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
