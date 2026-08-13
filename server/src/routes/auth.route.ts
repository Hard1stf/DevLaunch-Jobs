import { Router } from 'express';
import { register } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', register);

router.post('/login', (_req, res) => {
  res.status(501).json({
    success: false,
    message: 'Login not implemented yet',
  });
});

export default router;
