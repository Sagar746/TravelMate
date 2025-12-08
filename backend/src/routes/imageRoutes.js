import express from 'express';
import {
  getAllImages,
  uploadImage,
  updateImage,
  deleteImage
} from '../controllers/imageController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../config/multer.js';

const router = express.Router({ mergeParams: true });

// All image routes require authentication
router.use(authMiddleware);

router.get('/', getAllImages);
router.post('/', upload.single('image'), uploadImage);
router.put('/:id', updateImage);
router.delete('/:id', deleteImage);

export default router;
