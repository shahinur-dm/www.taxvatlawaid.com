import { Router } from 'express';
import { getPublicArticleBySlug, getPublicArticles } from '../controllers/articleController';
import { getPublicContent } from '../controllers/contentController';
import { createInquiry } from '../controllers/inquiryController';
import { getPublicServices } from '../controllers/serviceController';
import { getPublicSettings } from '../controllers/settingsController';
import { bookingLimiter } from '../middleware/rateLimiter';
import { validateBody } from '../middleware/validate';
import { createInquirySchema } from '../validators/schemas';

const router = Router();

router.get('/services', getPublicServices);
router.get('/settings/public', getPublicSettings);
router.get('/content', getPublicContent);
router.get('/articles', getPublicArticles);
router.get('/articles/:slug', getPublicArticleBySlug);
router.post('/inquiries', bookingLimiter, validateBody(createInquirySchema), createInquiry);

export default router;

