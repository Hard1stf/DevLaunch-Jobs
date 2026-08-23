import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { jobIdParamSchema } from '../validators/jobQuery.validator.js';
import { saveJob } from '../services/savedJob.service.js';
import { APIResponse } from '../utils/APIResponse.js';

export const saveJobController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const candidateId = req.user!.userId;

    const { jobId } = jobIdParamSchema.parse(req.params);

    const savedJob = await saveJob(candidateId, jobId);

    res.status(201).json(new APIResponse(savedJob, 'Job Saved Successfully'));
  } catch (error) {
    next(error);
  }
};
