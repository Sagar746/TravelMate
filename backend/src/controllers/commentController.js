import { Comment, Trip, Image, User } from '../models/index.js';
import { successResponse, errorResponse } from '../utils/responseUtils.js';

// Get all comments for a trip
export const getTripComments = async (req, res, next) => {
  try {
    const { tripId } = req.params;

    const comments = await Comment.findAll({
      where: { trip_id: tripId, image_id: null },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profile_image']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    return successResponse(res, 200, 'Comments retrieved successfully', comments);
  } catch (error) {
    next(error);
  }
};

// Add comment to trip
export const addTripComment = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const { comment_text } = req.body;
    const userId = req.user.id;

    // Verify trip exists
    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      return errorResponse(res, 404, 'Trip not found');
    }

    const comment = await Comment.create({
      trip_id: tripId,
      user_id: userId,
      comment_text
    });

    // Get comment with user info
    const commentWithUser = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profile_image']
        }
      ]
    });

    return successResponse(res, 201, 'Comment added successfully', commentWithUser);
  } catch (error) {
    next(error);
  }
};

// Get all comments for an image
export const getImageComments = async (req, res, next) => {
  try {
    const { imageId } = req.params;

    const comments = await Comment.findAll({
      where: { image_id: imageId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profile_image']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    return successResponse(res, 200, 'Image comments retrieved successfully', comments);
  } catch (error) {
    next(error);
  }
};

// Add comment to image
export const addImageComment = async (req, res, next) => {
  try {
    const { imageId } = req.params;
    const { comment_text } = req.body;
    const userId = req.user.id;

    // Verify image exists and get trip_id
    const image = await Image.findByPk(imageId);
    if (!image) {
      return errorResponse(res, 404, 'Image not found');
    }

    const comment = await Comment.create({
      trip_id: image.trip_id,
      user_id: userId,
      image_id: imageId,
      comment_text
    });

    // Get comment with user info
    const commentWithUser = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profile_image']
        }
      ]
    });

    return successResponse(res, 201, 'Comment added successfully', commentWithUser);
  } catch (error) {
    next(error);
  }
};

// Update comment
export const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment_text } = req.body;
    const userId = req.user.id;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return errorResponse(res, 404, 'Comment not found');
    }

    // Verify comment ownership
    if (comment.user_id !== userId) {
      return errorResponse(res, 403, 'You can only edit your own comments');
    }

    await comment.update({ comment_text });

    return successResponse(res, 200, 'Comment updated successfully', comment);
  } catch (error) {
    next(error);
  }
};

// Delete comment
export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return errorResponse(res, 404, 'Comment not found');
    }

    // Verify comment ownership
    if (comment.user_id !== userId) {
      return errorResponse(res, 403, 'You can only delete your own comments');
    }

    await comment.destroy();

    return successResponse(res, 200, 'Comment deleted successfully');
  } catch (error) {
    next(error);
  }
};
