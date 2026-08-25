import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { jobIdParamSchema, savedJobIdParamSchema } from '../validators/jobQuery.validator.js';
import {
  getSavedJobs,
  saveJob,
  unsaveJob,
} from '../services/savedJob.service.js';
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

export const getSavedJobsController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const candidateId = req.user!.userId;

    const savedJobs = await getSavedJobs(candidateId);

    res
      .status(200)
      .json(new APIResponse(savedJobs, 'Saved Jobs fetched successfully.'));
  } catch (error) {
    next(error);
  }
};

export const unsaveJobController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const candidateId = req.user!.userId;
    const { savedJob } = savedJobIdParamSchema.parse(req.params);

    await unsaveJob(candidateId, savedJob);

    res.status(200).json(new APIResponse(null, 'Job is Unsave successfully'));
  } catch (error) {
    next(error);
  }
};
