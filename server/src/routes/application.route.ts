import { Router } from 'express';
import {
  getApplicationByIdController,
  getCandidateApplicationsController,
} from '../controllers/application.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/role.middleware.js';

const router = Router();

router.use(authenticate);
router.use(authorizeRole('candidate'));

router.get('/', getCandidateApplicationsController);
router.get('/:applicationId', getApplicationByIdController);

export default router;
