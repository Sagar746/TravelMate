import express from 'express';
import { 
  getAllTrips, 
  getTripById, 
  createTrip, 
  updateTrip, 
  deleteTrip,
  getTripSummary
} from '../controllers/tripController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validation.js';
import { createTripSchema, updateTripSchema } from '../validators/tripValidator.js';

const router = express.Router();

// All trip routes require authentication
router.use(authMiddleware);

router.get('/', getAllTrips);
router.get('/:id', getTripById);
router.post('/', validate(createTripSchema), createTrip);
router.put('/:id', validate(updateTripSchema), updateTrip);
router.delete('/:id', deleteTrip);
router.get('/:id/summary', getTripSummary);

export default router;
