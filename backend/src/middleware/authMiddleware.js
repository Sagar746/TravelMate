import { verifyToken } from '../utils/tokenUtils.js';
import { User } from '../models/index.js';
import { errorResponse } from '../utils/responseUtils.js';

export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 401, 'No token provided');
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return errorResponse(res, 401, 'Invalid or expired token');
    }

    // Get user from database
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password_hash'] }
    });

    if (!user) {
      return errorResponse(res, 401, 'User not found');
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 401, 'Authentication failed');
  }
};
