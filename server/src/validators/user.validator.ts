import { z } from 'zod';

export const updateProfileSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, 'First name cannot be empty')
      .max(50, 'First name cannot exceed 50 characters')
      .optional(),
    lastName: z
      .string()
      .trim()
      .min(1, 'Last name cannot be empty')
      .max(50, 'Last name cannot exceed 50 characters')
      .optional(),
    location: z
      .string()
      .trim()
      .min(1, 'Location cannot be empty')
      .max(120, 'Location cannot exceed 120 characters')
      .optional(),
    bio: z
      .string()
      .trim()
      .min(1, 'Bio cannot be empty')
      .max(500, 'Bio cannot exceed 500 characters')
      .optional(),
    skills: z
      .array(
        z
          .string()
          .trim()
          .min(1, 'Skill cannot be empty')
          .max(50, 'Skill cannot exceed 50 characters'),
      )
      .max(15, 'You cannot add more than 15 skills')
      .refine(
        (skills) => {
          const normalizedSkills = skills.map((skill) => skill.toLowerCase());

          return new Set(normalizedSkills).size === skills.length;
        },
        { message: 'Duplicate skills are not allowed' },
      )
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one profile field is required',
  });

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
