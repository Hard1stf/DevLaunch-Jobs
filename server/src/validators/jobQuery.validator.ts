import { z } from "zod";

const jobTypeSchema = z.enum([
  'full-time',
  'part-time',
  'internship',
  'contract',
]);

export const jobIdParamSchema = z.object({
    jobId: z.string().trim().min(1, 'Zob ID is required'),
});

export const jobListQuerySchema = z.object({
    search: z.string().trim().optional(),
    location: z.string().trim().optional(),
    type: jobTypeSchema.optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
    sort: z.enum(['latest']).default('latest'),
});

export type JobListQueryInput = z.infer<typeof jobListQuerySchema>;
export type JobIdParamInput = z.infer<typeof jobIdParamSchema>;