import { Router } from 'express';
import {
  deleteAppointment,
  getAppointmentById,
  getDashboardStats,
  getRecentAppointments,
  listAppointments,
  updateAppointmentNotes,
  updateAppointmentStatus,
} from '../controllers/adminAppointmentController';
import { updateContent } from '../controllers/contentController';
import {
  createArticle,
  deleteArticle,
  getAdminArticles,
  updateArticle,
} from '../controllers/articleController';
import {
  deleteInquiry,
  getAdminInquiries,
  updateInquiryStatus,
} from '../controllers/inquiryController';
import {
  createService,
  deleteService,
  getAdminServices,
  updateService,
} from '../controllers/serviceController';
import { getAdminSettings, updateSettings } from '../controllers/settingsController';
import { requireAdmin, requireAuth } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import {
  articleSchema,
  serviceSchema,
  updateAppointmentNotesSchema,
  updateAppointmentStatusSchema,
  updateArticleSchema,
  updateContentSchema,
  updateInquiryStatusSchema,
  updateServiceSchema,
  updateSettingsSchema,
} from '../validators/schemas';

const router = Router();

// All /api/admin/* endpoints require valid admin JWT cookie & role
router.use(requireAuth, requireAdmin);

// Dashboard
router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/recent-appointments', getRecentAppointments);

// Appointments management
router.get('/appointments', listAppointments);
router.get('/appointments/:id', getAppointmentById);
router.patch(
  '/appointments/:id/status',
  validateBody(updateAppointmentStatusSchema),
  updateAppointmentStatus
);
router.patch(
  '/appointments/:id/notes',
  validateBody(updateAppointmentNotesSchema),
  updateAppointmentNotes
);
router.delete('/appointments/:id', deleteAppointment);

// Services management
router.get('/services', getAdminServices);
router.post('/services', validateBody(serviceSchema), createService);
router.patch('/services/:id', validateBody(updateServiceSchema), updateService);
router.delete('/services/:id', deleteService);

// Settings management
router.get('/settings', getAdminSettings);
router.patch('/settings', validateBody(updateSettingsSchema), updateSettings);

// Content management
router.patch('/content', validateBody(updateContentSchema), updateContent);

// Insights / Articles management
router.get('/articles', getAdminArticles);
router.post('/articles', validateBody(articleSchema), createArticle);
router.patch('/articles/:id', validateBody(updateArticleSchema), updateArticle);
router.delete('/articles/:id', deleteArticle);

// Contact inquiries management
router.get('/inquiries', getAdminInquiries);
router.patch(
  '/inquiries/:id/status',
  validateBody(updateInquiryStatusSchema),
  updateInquiryStatus
);
router.delete('/inquiries/:id', deleteInquiry);

export default router;

