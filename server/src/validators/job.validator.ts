import { z } from 'zod';

const jobTypeSchema = z.enum([
  'full-time',
  'part-time',
  'internship',
  'contract',
]);

export const createJobSchema = z.object({
  company: z.string().trim().min(1, 'Company is required'),
  role: z.string().trim().min(1, 'Role is required'),
  location: z.string().trim().min(1, 'Location is required'),
  type: jobTypeSchema,
  salary: z.string().trim().optional(),
  skills: z.array(z.string().trim().min(1, 'Skill cannot be empty')).default([]),
  requirements: z.array(z.string().trim().min(1, 'Requirement cannot be empty')).default([]),
  description: z.string().trim().min(1, 'Description is required'),
});

export const updateJobSchema = createJobSchema.partial();
// zod take existing schema "createJobSchema" and make it every field optional.

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
