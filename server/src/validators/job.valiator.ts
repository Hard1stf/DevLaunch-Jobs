import { z } from 'zod';

const jobTypeSchema = z.enum([
  'full-time',
  'part-time',
  'internship',
  'contract',
]);

const jobStatus = z.enum(['open', 'closed']);

export const createJobSchema = z.object({
  company: z.string().trim().min(1, 'Company is required'),
  role: z.string().trim().min(1, 'Role is required'),
  location: z.string().trim().min(1, 'Location is required'),
  type: jobTypeSchema,
  salary: z.string().trim().optional(),
  skill: z.array(z.string().trim().min(1)).default([]),
  requirements: z.array(z.string().trim().min(1)).default([]),
  description: z.string().trim().min(1, 'Description is required'),
  status: jobStatus.optional(),
});

export const updateJobSchema = createJobSchema.partial();
// zod take existing schema "createJobSchema" and make it every field optional.

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
