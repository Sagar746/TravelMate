import express from 'express';
import {
  getTripComments,
  addTripComment,
  getImageComments,
  addImageComment,
  updateComment,
  deleteComment
} from '../controllers/commentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Trip comments
router.get('/trips/:tripId/comments', getTripComments);
router.post('/trips/:tripId/comments', authMiddleware, addTripComment);

// Image comments
router.get('/images/:imageId/comments', getImageComments);
router.post('/images/:imageId/comments', authMiddleware, addImageComment);

// Comment update/delete (requires authentication)
router.put('/:id', authMiddleware, updateComment);
router.delete('/:id', authMiddleware, deleteComment);

export default router;
