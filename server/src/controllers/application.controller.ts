import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { createApplication } from '../services/application.service.js';
import { jobIdParamSchema } from '../validators/jobQuery.validator.js';
import { APIResponse } from '../utils/APIResponse.js';

export const createApplicationController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const candidateId = req.user!.userId;
    const { jobId } = jobIdParamSchema.parse(req.params);

    const application = await createApplication(candidateId, jobId);

    res
      .status(201)
      .json(
        new APIResponse(application, 'JApplication submitted successfully'),
      );
  } catch (error) {
    next(error);
  }
};
