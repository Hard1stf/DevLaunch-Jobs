import { JobModel } from '../models/Job.js';
import type {
  CreateJobInput,
  UpdateJobInput,
} from '../validators/job.validator.js';
import { APIError } from '../utils/APIError.js';

export const createJob = async (recruiterId: string, data: CreateJobInput) => {
  const job = await JobModel.create({
    ...data,
    recruiterId,
    status: 'open',
  });
  return job;
};

export const updateJob = async (
  recruiterId: string,
  jobId: string,
  data: UpdateJobInput,
) => {
  const job = await JobModel.findOne({
    _id: jobId,
    recruiterId,
  });

  if (!job) {
    throw new APIError(404, 'Job not found');
  }

  Object.assign(job, data);
  await job.save();
  return job;
};

export const deleteJob = async (recruiterId: string, jobId: string) => {
  const job = await JobModel.findOne({
    _id: jobId,
    recruiterId,
  });

  if (!job) throw new APIError(404, 'job not found');

  await job.deleteOne();
};
