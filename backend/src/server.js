import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Import database
import sequelize, { testConnection } from './config/database.js';
import * as models from './models/index.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import itineraryRoutes from './routes/itineraryRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

// Import middleware
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Create upload directories if they don't exist
const uploadDirs = [
  path.join(__dirname, '../uploads/images'),
  path.join(__dirname, '../uploads/receipts')
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/trips/:tripId/expenses', expenseRoutes);
app.use('/api/trips/:tripId/itinerary', itineraryRoutes);
app.use('/api/trips/:tripId/images', imageRoutes);
app.use('/api/comments', commentRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'TravelMate API is running',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to TravelMate API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      trips: '/api/trips',
      expenses: '/api/trips/:tripId/expenses',
      itinerary: '/api/trips/:tripId/itinerary',
      images: '/api/trips/:tripId/images',
      comments: '/api/comments',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Database sync and server start
const startServer = async () => {
  try {
    // Test database connection
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ Failed to connect to database. Please check your .env configuration.');
      process.exit(1);
    }

    // Sync database models
    // Use { force: true } to drop and recreate tables (only in development!)
    // Use { alter: true } to update tables without dropping data
    await sequelize.sync({ alter: false });
    console.log('✅ Database models synchronized');

    // Start server
    app.listen(PORT, () => {
      console.log('=================================');
      console.log(`🚀 TravelMate API Server Running`);
      console.log(`📡 Port: ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 URL: http://localhost:${PORT}`);
      console.log(`📚 API Docs: http://localhost:${PORT}/api`);
      console.log('=================================');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;
