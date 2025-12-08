import express from 'express';
import {
  getAllItineraryDays,
  getItineraryDayById,
  createItineraryDay,
  updateItineraryDay,
  deleteItineraryDay
} from '../controllers/itineraryController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

// All itinerary routes require authentication
router.use(authMiddleware);

router.get('/', getAllItineraryDays);
router.get('/:id', getItineraryDayById);
router.post('/', createItineraryDay);
router.put('/:id', updateItineraryDay);
router.delete('/:id', deleteItineraryDay);

export default router;
