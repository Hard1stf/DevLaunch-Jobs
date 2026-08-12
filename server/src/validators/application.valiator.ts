import { z } from 'zod';

const applicationStatusSchema = z.enum([
  'applied',
  'reviewing',
  'accepted',
  'rejected',
  'shortlisted',
]);

export const createApplicationSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
});

export const updateApplicationStatusSchema = z.object({
  status: applicationStatusSchema,
});


export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationInput = z.infer<typeof updateApplicationStatusSchema>;
