import { JobModel } from '../models/Job.js';
import type { Job } from '../models/Job.js';
import type { QueryFilter } from 'mongoose';
import type { JobListQueryInput } from '../validators/jobQuery.validator.js';
import { APIError } from '../utils/APIError.js';

export const getJobs = async (query: JobListQueryInput) => {
  const { search, location, type, page, limit, sort } = query;

  const filter: QueryFilter<Job> = {
    status: 'open',
  };

  if (location) {
    filter.location = {
      $regex: location,
      $options: 'i',
    };
  }

  if (type) {
    filter.type = type;
  }

  if (search) {
    filter.$or = [
      {
        role: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        company: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        skills: {
          $regex: search,
          $options: 'i',
        },
      },
    ];
  }

  const skip = (page - 1) * limit;

  const [jobs, total] = await Promise.all([
    JobModel.find(filter)
      .sort(sort === 'latest' ? { createdAt: -1 } : { createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    JobModel.countDocuments(filter),
  ]);

  return {
    jobs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPreviousPage: page > 1,
    },
  };
};

export const getJobById = async (jobId: string) => {
  const job = JobModel.findOne({
    _id: jobId,
    status: 'open',
  }).lean();

  if (!job) throw new APIError(404, 'Job not Found');

  return job;
};
