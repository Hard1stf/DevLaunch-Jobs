import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import {
  getApplicationById,
  createApplication,
  getApplications,
} from '../services/application.service.js';
import { jobIdParamSchema } from '../validators/jobQuery.validator.js';
import { APIResponse } from '../utils/APIResponse.js';
import { applicationIdParamSchema } from '../validators/applicationQuery.validator.js';

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

export const getCandidateApplicationsController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const candidateId = req.user!.userId;

    const applications = await getApplications(candidateId);

    res
      .status(200)
      .json(new APIResponse(applications, 'Applications fetched successfully'));
  } catch (error) {
    next(error);
  }
};

export const getApplicationByIdController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const candidateId = req.user!.userId;
    const { applicationId } = applicationIdParamSchema.parse(req.params);

    const application = await getApplicationById(candidateId, applicationId);

    res
      .status(200)
      .json(new APIResponse(application, 'Application fetched successfully'));
  } catch (error) {
    next(error);
  }
};
