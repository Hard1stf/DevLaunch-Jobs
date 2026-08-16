import { Router } from 'express';
import authRouter from './auth.route.js';
import { authenticate, AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/role.middleware.js';

const router = Router();

router.get('/protected', authenticate, (req: AuthenticatedRequest, res) => {
    res.json({
        success: true,
        data: {
            user: req.user,
        }
    });
});

router.get('/candidate-test', authenticate, authorizeRole('candidate'), (req: AuthenticatedRequest, res) => {
    res.json({
      success: true,
      data: {
        user: req.user,
      },
    });
  }
);

router.get('/recruiter-test', authenticate, authorizeRole('recruiter'), (req: AuthenticatedRequest, res) => {
    res.json({
      success: true,
      data: {
        user: req.user,
      },
    });
  }
);

router.use('/auth', authRouter);

export default router;
