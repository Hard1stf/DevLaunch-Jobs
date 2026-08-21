import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { jobIdParamSchema } from '../validators/jobQuery.validator.js';
import {
  createJobSchema,
  updateJobSchema,
} from '../validators/job.validator.js';
import {
  createJob,
  updateJob,
  deleteJob,
  getRecruiterJobs,
} from '../services/recruiterJob.service.js';
import { APIResponse } from '../utils/APIResponse.js';

export const createJobController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const recruiterId = req.user!.userId;
    const data = createJobSchema.parse(req.body);
    const job = await createJob(recruiterId, data);

    res.status(201).json(new APIResponse(job, 'Job created successfully'));
  } catch (error) {
    next(error);
  }
};

export const updateJobController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const recruiterId = req.user!.userId;
    const { jobId } = jobIdParamSchema.parse(req.params);
    const data = updateJobSchema.parse(req.body);

    const job = await updateJob(recruiterId, jobId, data);

    res.status(200).json(new APIResponse(job, 'Job Updated Successfully'));
  } catch (error) {
    next(error);
  }
};

export const deleteJobController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const recruiterId = req.user!.userId;
    const { jobId } = jobIdParamSchema.parse(req.params);

    await deleteJob(recruiterId, jobId);

    res.status(200).json(new APIResponse(null, 'Job deleted Successfully'));
  } catch (error) {
    next(error);
  }
};

export const getRecruiterJobsController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const recruiterId = req.user!.userId;

    const jobs = await getRecruiterJobs(recruiterId);

    res
      .status(200)
      .json(new APIResponse(jobs, 'Recruiter jobs fetched successfully'));
  } catch (error) {
    next(error);
  }
};
