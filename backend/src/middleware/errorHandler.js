import { errorResponse } from '../utils/responseUtils.js';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    return errorResponse(res, 400, 'Validation error', errors);
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    return errorResponse(res, 400, 'Duplicate entry. This record already exists.');
  }

  // Sequelize foreign key error
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return errorResponse(res, 400, 'Referenced record does not exist.');
  }

  // Multer file upload error
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return errorResponse(res, 400, 'File too large. Maximum size is 5MB.');
    }
    return errorResponse(res, 400, 'File upload error: ' + err.message);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 401, 'Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 401, 'Token expired');
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  
  return errorResponse(res, statusCode, message);
};

// 404 handler
export const notFoundHandler = (req, res) => {
  return errorResponse(res, 404, `Route ${req.originalUrl} not found`);
};
