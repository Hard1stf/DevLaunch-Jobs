import type { Request, Response, NextFunction } from 'express';
import {
  jobIdParamSchema,
  jobListQuerySchema,
} from '../validators/jobQuery.validator.js';
import { getJobs, getJobById } from '../services/job.service.js';
import { APIResponse } from '../utils/APIResponse.js';
import { APIError } from '../utils/APIError.js';

export const getJobsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const query = jobListQuerySchema.parse(req.query);
    const result = await getJobs(query);

    res
      .status(200)
      .json(new APIResponse(result, 'Jobs retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

export const getJobByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { jobId } = jobIdParamSchema.parse(req.params);
    const job = await getJobById(jobId);

    if(!job) throw new APIError(404, 'Job not found')

    res.status(200).json(new APIResponse(job, 'Job retrieved successfully'));
  } catch (error) {
    next(error);
  }
};
