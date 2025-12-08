import { Image, Trip } from '../models/index.js';
import { successResponse, errorResponse } from '../utils/responseUtils.js';

// Get all images for a trip
export const getAllImages = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.id;

    // Verify trip access
    const trip = await Trip.findOne({
      where: { id: tripId, user_id: userId }
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    const images = await Image.findAll({
      where: { trip_id: tripId },
      order: [['upload_date', 'DESC']]
    });

    return successResponse(res, 200, 'Images retrieved successfully', images);
  } catch (error) {
    next(error);
  }
};

// Upload new image
export const uploadImage = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const { caption } = req.body;
    const userId = req.user.id;

    // Verify trip access
    const trip = await Trip.findOne({
      where: { id: tripId, user_id: userId }
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    if (!req.file) {
      return errorResponse(res, 400, 'No image file provided');
    }

    const image = await Image.create({
      trip_id: tripId,
      user_id: userId,
      image_url: `/uploads/images/${req.file.filename}`,
      caption: caption || null
    });

    return successResponse(res, 201, 'Image uploaded successfully', image);
  } catch (error) {
    next(error);
  }
};

// Update image caption
export const updateImage = async (req, res, next) => {
  try {
    const { tripId, id } = req.params;
    const { caption } = req.body;
    const userId = req.user.id;

    // Verify trip access
    const trip = await Trip.findOne({
      where: { id: tripId, user_id: userId }
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    const image = await Image.findOne({
      where: { id, trip_id: tripId }
    });

    if (!image) {
      return errorResponse(res, 404, 'Image not found');
    }

    await image.update({ caption });

    return successResponse(res, 200, 'Image updated successfully', image);
  } catch (error) {
    next(error);
  }
};

// Delete image
export const deleteImage = async (req, res, next) => {
  try {
    const { tripId, id } = req.params;
    const userId = req.user.id;

    // Verify trip access
    const trip = await Trip.findOne({
      where: { id: tripId, user_id: userId }
    });

    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    const image = await Image.findOne({
      where: { id, trip_id: tripId }
    });

    if (!image) {
      return errorResponse(res, 404, 'Image not found');
    }

    await image.destroy();

    return successResponse(res, 200, 'Image deleted successfully');
  } catch (error) {
    next(error);
  }
};
