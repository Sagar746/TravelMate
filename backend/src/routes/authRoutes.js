import express from 'express';
import { register, login, getCurrentUser, updateProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validation.js';
import { registerSchema, loginSchema, updateProfileSchema } from '../validators/authValidator.js';

const router = express.Router();

// Public routes
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Protected routes
router.get('/me', authMiddleware, getCurrentUser);
router.put('/update-profile', authMiddleware, validate(updateProfileSchema), updateProfile);

export default router;
