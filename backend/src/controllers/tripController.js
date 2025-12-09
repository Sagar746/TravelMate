import { Trip, Expense, Image, ItineraryDay, User } from '../models/index.js';
import { successResponse, errorResponse } from '../utils/responseUtils.js';
import { Op } from 'sequelize';

// Get all trips for logged-in user
export const getAllTrips = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const trips = await Trip.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Expense,
          as: 'expenses',
          attributes: ['id', 'amount', 'category']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    // Calculate total expenses for each trip
    const tripsWithTotals = trips.map(trip => {
      const tripData = trip.toJSON();
      const totalExpenses = tripData.expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
      
      return {
        ...tripData,
        totalExpenses,
        days: Math.ceil((new Date(tripData.end_date) - new Date(tripData.start_date)) / (1000 * 60 * 60 * 24))
      };
    });

    return successResponse(res, 200, 'Trips retrieved successfully', tripsWithTotals);
  } catch (error) {
    next(error);
  }
};

// Get single trip by ID
export const getTripById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const trip = await Trip.findOne({
      where: { id, user_id: userId },
      include: [
        {
          model: Expense,
          as: 'expenses',
          attributes: ['id', 'amount', 'category', 'date', 'description']
        },
        {
          model: Image,
          as: 'images',
          attributes: ['id', 'image_url', 'caption', 'upload_date']
        },
        {
          model: ItineraryDay,
          as: 'itinerary_days',
          attributes: ['id', 'day_number', 'date', 'title', 'description'],
          order: [['day_number', 'ASC']]
        }
      ]
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    const tripData = trip.toJSON();
    const totalExpenses = tripData.expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    const days = Math.ceil((new Date(tripData.end_date) - new Date(tripData.start_date)) / (1000 * 60 * 60 * 24));

    return successResponse(res, 200, 'Trip retrieved successfully', {
      ...tripData,
      totalExpenses,
      days
    });
  } catch (error) {
    next(error);
  }
};

// Create new trip
export const createTrip = async (req, res, next) => {
  try {
    const { name, destination, start_date, end_date, budget, description, status } = req.body;
    const userId = req.user.id;
    const trip = await Trip.create({
      user_id: userId,
      name,
      destination,
      start_date,
      end_date,
      budget,
      description,
      status: status || 'planning'
    });

    return successResponse(res, 201, 'Trip created successfully', trip);
  } catch (error) {
    next(error);
  }
};

// Update trip
export const updateTrip = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    // Find trip
    const trip = await Trip.findOne({
      where: { id, user_id: userId }
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    // Update trip
    await trip.update(updateData);

    return successResponse(res, 200, 'Trip updated successfully', trip);
  } catch (error) {
    next(error);
  }
};

// Delete trip
export const deleteTrip = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const trip = await Trip.findOne({
      where: { id, user_id: userId }
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    await trip.destroy();

    return successResponse(res, 200, 'Trip deleted successfully');
  } catch (error) {
    next(error);
  }
};

// Get trip summary
export const getTripSummary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const trip = await Trip.findOne({
      where: { id, user_id: userId },
      include: [
        {
          model: Expense,
          as: 'expenses'
        }
      ]
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    const expenses = trip.expenses;
    const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    
    // Group expenses by category
    const expensesByCategory = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount);
      return acc;
    }, {});

    const days = Math.ceil((new Date(trip.end_date) - new Date(trip.start_date)) / (1000 * 60 * 60 * 24));

    return successResponse(res, 200, 'Trip summary retrieved successfully', {
      trip: {
        id: trip.id,
        name: trip.name,
        destination: trip.destination,
        start_date: trip.start_date,
        end_date: trip.end_date,
        budget: trip.budget,
        status: trip.status
      },
      totalExpenses,
      remainingBudget: trip.budget ? parseFloat(trip.budget) - totalExpenses : null,
      expensesByCategory,
      days,
      expenseCount: expenses.length
    });
  } catch (error) {
    next(error);
  }
};
