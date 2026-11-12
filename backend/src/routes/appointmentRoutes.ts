import { Router } from 'express';
import {
  createAppointment,
  getAppointmentByReference,
  getAvailableSlots,
} from '../controllers/appointmentController';
import { bookingLimiter } from '../middleware/rateLimiter';
import { validateBody, validateQuery } from '../middleware/validate';
import {
  availableSlotsQuerySchema,
  createAppointmentSchema,
} from '../validators/schemas';

const router = Router();

router.get('/available-slots', validateQuery(availableSlotsQuerySchema), getAvailableSlots);
router.get('/reference/:reference', getAppointmentByReference);
router.post('/', bookingLimiter, validateBody(createAppointmentSchema), createAppointment);

export default router;

