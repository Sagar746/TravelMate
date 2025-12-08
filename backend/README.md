# TravelMate Backend API

REST API for TravelMate Travel Planner & Expense Tracker application.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` file in the backend root:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials.

### 3. Create Database
```sql
CREATE DATABASE travelmate_db;
```

### 4. Run Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on http://localhost:5000

## 📚 API Documentation

Base URL: `http://localhost:5000/api`

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/update-profile` - Update profile (protected)

### Trip Endpoints
- `GET /api/trips` - Get all trips
- `GET /api/trips/:id` - Get single trip
- `POST /api/trips` - Create trip (protected)
- `PUT /api/trips/:id` - Update trip (protected)
- `DELETE /api/trips/:id` - Delete trip (protected)

### Expense Endpoints
- `GET /api/trips/:tripId/expenses` - Get all expenses
- `POST /api/trips/:tripId/expenses` - Add expense (protected)
- `PUT /api/trips/:tripId/expenses/:id` - Update expense (protected)
- `DELETE /api/trips/:tripId/expenses/:id` - Delete expense (protected)

### Image Endpoints
- `GET /api/trips/:tripId/images` - Get all images
- `POST /api/trips/:tripId/images` - Upload image (protected)
- `DELETE /api/trips/:tripId/images/:id` - Delete image (protected)

### Comment Endpoints
- `GET /api/trips/:tripId/comments` - Get trip comments
- `POST /api/trips/:tripId/comments` - Add comment (protected)
- `PUT /api/comments/:id` - Update comment (protected)
- `DELETE /api/comments/:id` - Delete comment (protected)

## 🗄️ Database Schema

7 tables: users, trips, expenses, itinerary_days, images, comments, trip_collaborators

See BACKEND_PLAN.md for detailed schema.

## 🔐 Authentication

Uses JWT (JSON Web Tokens). Include token in requests:
```
Authorization: Bearer <your_jwt_token>
```

## 📦 Tech Stack

- Node.js + Express.js
- MySQL + Sequelize ORM
- JWT Authentication
- Multer (File Upload)
- Bcrypt (Password Hashing)
