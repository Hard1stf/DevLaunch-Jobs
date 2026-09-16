import { Router } from 'express';
import {
  getCurrentUserController,
  updateCurrentUserController,
} from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/me', getCurrentUserController);
router.patch('/me', updateCurrentUserController);

export default router;
