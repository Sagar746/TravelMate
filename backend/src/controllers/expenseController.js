import { Expense, Trip } from '../models/index.js';
import { successResponse, errorResponse } from '../utils/responseUtils.js';

// Get all expenses for a trip
export const getAllExpenses = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.id;

    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: tripId, user_id: userId }
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    const expenses = await Expense.findAll({
      where: { trip_id: tripId },
      order: [['date', 'DESC']]
    });

    return successResponse(res, 200, 'Expenses retrieved successfully', expenses);
  } catch (error) {
    next(error);
  }
};

// Get single expense
export const getExpenseById = async (req, res, next) => {
  try {
    const { tripId, id } = req.params;
    const userId = req.user.id;

    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: tripId, user_id: userId }
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    const expense = await Expense.findOne({
      where: { id, trip_id: tripId }
    });

    if (!expense) {
      return errorResponse(res, 404, 'Expense not found');
    }

    return successResponse(res, 200, 'Expense retrieved successfully', expense);
  } catch (error) {
    next(error);
  }
};

// Create new expense
export const createExpense = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const { amount, category, date, description } = req.body;
    const userId = req.user.id;

    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: tripId, user_id: userId }
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    const expense = await Expense.create({
      trip_id: tripId,
      amount,
      category,
      date,
      description,
      receipt_image: req.file ? req.file.path : null
    });

    return successResponse(res, 201, 'Expense added successfully', expense);
  } catch (error) {
    next(error);
  }
};

// Update expense
export const updateExpense = async (req, res, next) => {
  try {
    const { tripId, id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: tripId, user_id: userId }
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    const expense = await Expense.findOne({
      where: { id, trip_id: tripId }
    });

    if (!expense) {
      return errorResponse(res, 404, 'Expense not found');
    }

    await expense.update(updateData);

    return successResponse(res, 200, 'Expense updated successfully', expense);
  } catch (error) {
    next(error);
  }
};

// Delete expense
export const deleteExpense = async (req, res, next) => {
  try {
    const { tripId, id } = req.params;
    const userId = req.user.id;

    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: tripId, user_id: userId }
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    const expense = await Expense.findOne({
      where: { id, trip_id: tripId }
    });

    if (!expense) {
      return errorResponse(res, 404, 'Expense not found');
    }

    await expense.destroy();

    return successResponse(res, 200, 'Expense deleted successfully');
  } catch (error) {
    next(error);
  }
};

// Get expenses grouped by category
export const getExpensesByCategory = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.id;

    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: tripId, user_id: userId }
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    const expenses = await Expense.findAll({
      where: { trip_id: tripId }
    });

    // Group by category
    const groupedExpenses = expenses.reduce((acc, expense) => {
      const category = expense.category;
      if (!acc[category]) {
        acc[category] = {
          category,
          total: 0,
          count: 0,
          expenses: []
        };
      }
      acc[category].total += parseFloat(expense.amount);
      acc[category].count += 1;
      acc[category].expenses.push(expense);
      return acc;
    }, {});

    return successResponse(res, 200, 'Expenses by category retrieved successfully', Object.values(groupedExpenses));
  } catch (error) {
    next(error);
  }
};
