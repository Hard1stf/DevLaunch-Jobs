import { Router } from 'express';
import {
  getRecruiterApplicationsController,
  updateApplicationStatusController,
} from '../controllers/application.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/role.middleware.js';

const router = Router();

router.use(authenticate);
router.use(authorizeRole('recruiter'));

router.get('/jobs/:jobId/applications', getRecruiterApplicationsController);
router.patch(
  '/applications/:applicationId/status',
  updateApplicationStatusController,
);

export default router;
