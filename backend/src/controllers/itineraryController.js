import { ItineraryDay, Trip } from '../models/index.js';
import { successResponse, errorResponse } from '../utils/responseUtils.js';

// Get all itinerary days for a trip
export const getAllItineraryDays = async (req, res, next) => {
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

    const itineraryDays = await ItineraryDay.findAll({
      where: { trip_id: tripId },
      order: [['day_number', 'ASC']]
    });

    return successResponse(res, 200, 'Itinerary days retrieved successfully', itineraryDays);
  } catch (error) {
    next(error);
  }
};

// Get single itinerary day
export const getItineraryDayById = async (req, res, next) => {
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

    const itineraryDay = await ItineraryDay.findOne({
      where: { id, trip_id: tripId }
    });

    if (!itineraryDay) {
      return errorResponse(res, 404, 'Itinerary day not found');
    }

    return successResponse(res, 200, 'Itinerary day retrieved successfully', itineraryDay);
  } catch (error) {
    next(error);
  }
};

// Create new itinerary day
export const createItineraryDay = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const { day_number, date, title, description } = req.body;
    const userId = req.user.id;

    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: tripId, user_id: userId }
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    const itineraryDay = await ItineraryDay.create({
      trip_id: tripId,
      day_number,
      date,
      title,
      description
    });

    return successResponse(res, 201, 'Itinerary day added successfully', itineraryDay);
  } catch (error) {
    next(error);
  }
};

// Update itinerary day
export const updateItineraryDay = async (req, res, next) => {
  try {
    const { tripId, id } = req.params;
    const updateData = req.body;
    const userId = req.user.id;

    // Verify trip ownership
    const trip = await Trip.findOne({
      where: { id: tripId, user_id: userId }
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    const itineraryDay = await ItineraryDay.findOne({
      where: { id, trip_id: tripId }
    });

    if (!itineraryDay) {
      return errorResponse(res, 404, 'Itinerary day not found');
    }

    await itineraryDay.update(updateData);

    return successResponse(res, 200, 'Itinerary day updated successfully', itineraryDay);
  } catch (error) {
    next(error);
  }
};

// Delete itinerary day
export const deleteItineraryDay = async (req, res, next) => {
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

    const itineraryDay = await ItineraryDay.findOne({
      where: { id, trip_id: tripId }
    });

    if (!itineraryDay) {
      return errorResponse(res, 404, 'Itinerary day not found');
    }

    await itineraryDay.destroy();

    return successResponse(res, 200, 'Itinerary day deleted successfully');
  } catch (error) {
    next(error);
  }
};
