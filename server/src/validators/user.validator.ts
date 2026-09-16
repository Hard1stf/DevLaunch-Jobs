import { z } from 'zod';

export const updateProfileSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .max(50, 'First name cannot exceed 50 character')
      .optional(),
    lastName: z
      .string()
      .trim()
      .max(50, 'Last name cannot exceed 50 characters')
      .optional(),
    location: z
      .string()
      .trim()
      .max(120, 'Location cannot exceed 120 characters')
      .optional(),
    bio: z
      .string()
      .trim()
      .max(500, 'Bio cannot exceed 500 characters')
      .optional(),
    skills: z.array(z.string().trim()).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one profile field is required',
  });

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
