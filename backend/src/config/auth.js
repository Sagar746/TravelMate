import dotenv from 'dotenv';

dotenv.config();

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your_super_secret_jwt_key',
  expiresIn: process.env.JWT_EXPIRE || '7d'
};
