import { Router } from 'express';
import { getMe, login, logout } from '../controllers/authController';
import { requireAdmin, requireAuth } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimiter';
import { validateBody } from '../middleware/validate';
import { loginSchema } from '../validators/schemas';

const router = Router();

router.post('/login', authLimiter, validateBody(loginSchema), login);
router.post('/logout', logout);
router.get('/me', requireAuth, requireAdmin, getMe);

export default router;

