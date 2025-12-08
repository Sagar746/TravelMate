import { User } from '../models/index.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { generateToken } from '../utils/tokenUtils.js';
import { successResponse, errorResponse } from '../utils/responseUtils.js';

// Register new user
export const register = async (req, res, next) => {
  try {
    const { username, email, password, full_name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return errorResponse(res, 400, 'Email already registered');
    }

    // Hash password
    const password_hash = await hashPassword(password);

    // Create user
    const user = await User.create({
      username,
      email,
      password_hash,
      full_name
    });

    // Remove password from response
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      created_at: user.created_at
    };

    return successResponse(res, 201, 'User registered successfully', userResponse);
  } catch (error) {
    next(error);
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return errorResponse(res, 401, 'Invalid email or password');
    }

    // Compare password
    const isValidPassword = await comparePassword(password, user.password_hash);

    if (!isValidPassword) {
      return errorResponse(res, 401, 'Invalid email or password');
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.username
    });

    // User response
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      profile_image: user.profile_image
    };

    return successResponse(res, 200, 'Login successful', {
      token,
      user: userResponse
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      full_name: req.user.full_name,
      profile_image: req.user.profile_image,
      created_at: req.user.created_at
    };

    return successResponse(res, 200, 'User retrieved successfully', user);
  } catch (error) {
    next(error);
  }
};

// Update user profile
export const updateProfile = async (req, res, next) => {
  try {
    const { username, email, full_name } = req.body;
    const userId = req.user.id;

    // Check if email is being changed and if it's already taken
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return errorResponse(res, 400, 'Email already in use');
      }
    }

    // Update user
    const [updated] = await User.update(
      { username, email, full_name },
      { where: { id: userId } }
    );

    if (!updated) {
      return errorResponse(res, 404, 'User not found');
    }

    // Get updated user
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password_hash'] }
    });

    return successResponse(res, 200, 'Profile updated successfully', user);
  } catch (error) {
    next(error);
  }
};
