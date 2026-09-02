import { z } from 'zod';

export const applicationIdParamSchema = z.object({
  applicationId: z
    .string()
    .trim()
    .min(1, 'Application Id is required')
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid Application ID'),
});

export const applicationStatusSchema = z.enum([
  'applied',
  'shortlisted',
  'rejected',
  'accepted',
  'reviewing',
]);

export const updateApplicationStatusSchema = z.object({status: applicationStatusSchema});

export type ApplicationIdParamsInput = z.infer<typeof applicationIdParamSchema>;
export type ApplicationStatus = z.infer<typeof applicationStatusSchema>;
