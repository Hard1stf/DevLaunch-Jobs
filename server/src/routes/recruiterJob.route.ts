import { Router } from 'express';
import {
  createJobController,
  updateJobController,
  deleteJobController,
  getRecruiterJobsController,
} from '../controllers/recruiterJob.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/role.middleware.js';

const router = Router();

router.use(authenticate);
router.use(authorizeRole('recruiter'));

router.get('/', getRecruiterJobsController);
router.post('/', createJobController);
router.patch('/:jobId', updateJobController);
router.delete('/:jobId', deleteJobController);

export default router;
