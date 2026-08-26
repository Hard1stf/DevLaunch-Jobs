import { z } from 'zod';

export const applicationIdParamSchema = z.object({
  applicationId: z
    .string()
    .trim()
    .min(1, 'Application Id is required')
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid Application ID'),
});

export type ApplicationIdParamsInput = z.infer<typeof applicationIdParamSchema>;
