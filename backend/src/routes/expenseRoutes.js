import express from 'express';
import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpensesByCategory
} from '../controllers/expenseController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validation.js';
import { createExpenseSchema, updateExpenseSchema } from '../validators/expenseValidator.js';
import { upload } from '../config/multer.js';

const router = express.Router({ mergeParams: true });

// All expense routes require authentication
router.use(authMiddleware);

router.get('/', getAllExpenses);
router.get('/category', getExpensesByCategory);
router.get('/:id', getExpenseById);
router.post('/', upload.single('receipt'), validate(createExpenseSchema), createExpense);
router.put('/:id', validate(updateExpenseSchema), updateExpense);
router.delete('/:id', deleteExpense);

export default router;
