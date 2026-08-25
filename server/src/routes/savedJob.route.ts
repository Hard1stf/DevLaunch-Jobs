import { Router } from 'express';
import {
  getSavedJobsController,
  saveJobController,
  unsaveJobController,
} from '../controllers/savedJob.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/role.middleware.js';

const router = Router();

router.use(authenticate);
router.use(authorizeRole('candidate'));

router.post('/:jobId', saveJobController);
router.get('/', getSavedJobsController);
router.delete('/:savedJob', unsaveJobController);
export default router;
