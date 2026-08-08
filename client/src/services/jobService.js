import { jobs } from '../data/jobs';

export const getJobs = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(jobs);
    }, 1500);
  });
};