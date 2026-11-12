import { Router } from 'express';
import { getPublicContent } from '../controllers/contentController';
import { getPublicServices } from '../controllers/serviceController';
import { getPublicSettings } from '../controllers/settingsController';

const router = Router();

router.get('/services', getPublicServices);
router.get('/settings/public', getPublicSettings);
router.get('/content', getPublicContent);

export default router;

