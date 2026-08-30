import { Router } from 'express';
import authRouter from './auth.route.js';
import jobRouter from './job.route.js';
import recruiterJobRouter from './recruiterJob.route.js';
import savedJobRouter from '../routes/savedJob.route.js';
import applicationRouter from '../routes/application.route.js';
import jobApplicationRouter from '../routes/jobApplication.route.js';
import recruiterApplicationRouter from '../routes/recruiterApplication.route.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/jobs', jobRouter);
router.use('/saved-jobs', savedJobRouter);
router.use('/recruiter/jobs', recruiterJobRouter);
router.use('/applications', applicationRouter);
router.use('/jobs', jobApplicationRouter);
router.use('/recruiter/jobs', recruiterApplicationRouter);

export default router;
