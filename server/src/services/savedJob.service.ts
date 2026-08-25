import { SavedJobModel } from '../models/SavedJob.js';
import { JobModel } from '../models/Job.js';
import { APIError } from '../utils/APIError.js';

export const saveJob = async (candidateId: string, jobId: string) => {
  const job = await JobModel.findById(jobId);

  if (!job) throw new APIError(404, 'Job Not Found');

  const savedJob = await SavedJobModel.create({
    candidateId,
    jobId,
  });

  return savedJob;
};

export const getSavedJobs = async (candidateId: string) => {
  const savedJobs = await SavedJobModel.find({ candidateId }).sort({createdAt : -1});

  return savedJobs;
};

export const unsaveJob = async (candidateId: string, savedJobId: string) => {
  const savedJob = await SavedJobModel.findOne({
    _id: savedJobId,
    candidateId,
  });

  if (!savedJob) throw new APIError(404, 'Job not Found');

  await savedJob.deleteOne();
};
