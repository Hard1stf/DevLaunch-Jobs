import { Router } from 'express';
import authRouter from './auth.route.js';
import jobRouter from './job.route.js';
import recruiterJobRouter from './recruiterJob.route.js';
import savedJobRouter from '../routes/savedJob.route.js'

const router = Router();

router.use('/auth', authRouter);
router.use('/jobs', jobRouter);
router.use('/saved-jobs', savedJobRouter);
router.use('/recruiter/jobs', recruiterJobRouter);

export default router;
