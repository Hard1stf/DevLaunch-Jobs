import { ApplicationModel } from '../models/Application.js';
import { JobModel } from '../models/Job.js';
import { APIError } from '../utils/APIError.js';

export const createApplication = async (candidateId: string, jobId: string) => {
  const job = await JobModel.findOne({
    _id: jobId,
    status: 'open',
  });

  if (!job) throw new APIError(404, 'Job not found or not open for apply');

  const application = await ApplicationModel.create({
    candidateId,
    jobId,
    status: 'applied',
  });

  return application;
};

export const getApplications = async (candidateId: string) => {
  const applications = await ApplicationModel.find({ candidateId }).sort({
    createdAt: -1,
  });

  return applications;
};

export const getApplicationById = async (
  candidateId: string,
  applicationId: string,
) => {
  const application = await ApplicationModel.findOne({
    _id: applicationId,
    candidateId,
  }).lean();

  if (!application) throw new APIError(404, 'Application not Found');

  return application;
};
