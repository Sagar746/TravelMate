import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/auth.js';

// Generate JWT token
export const generateToken = (payload) => {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn
  });
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.secret);
  } catch (error) {
    return null;
  }
};
