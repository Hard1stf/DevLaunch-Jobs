import { Router } from 'express';
import { createApplicationController } from '../controllers/application.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/role.middleware.js';

const router = Router();

router.use(authenticate);
router.use(authorizeRole('candidate'));

router.post('/:jobId/application', createApplicationController);

export default router;
