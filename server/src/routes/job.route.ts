import { Router } from 'express';
import {
  getJobByIdController,
  getJobsController,
} from '../controllers/job.controller.js';

const router = Router();

router.get('/', getJobsController);
router.get('/:jobId', getJobByIdController);

export default router;
