# TravelMate Backend - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment

1. Edit the `.env` file with your database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=travelmate_db
DB_PORT=3306

JWT_SECRET=change_this_to_a_random_long_string
```

### Step 3: Create MySQL Database

Open MySQL and run:

```sql
CREATE DATABASE travelmate_db;
```

Or use the command line:

```bash
mysql -u root -p -e "CREATE DATABASE travelmate_db;"
```

### Step 4: Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will automatically:
- Create all database tables
- Create upload directories
- Start on http://localhost:5000

## 📊 Database Tables Created

The server will create these 7 tables automatically:
1. **users** - User accounts
2. **trips** - Travel trips
3. **expenses** - Trip expenses
4. **itinerary_days** - Daily itinerary
5. **images** - Trip photos
6. **comments** - Comments on trips/images
7. **trip_collaborators** - Trip sharing

## 🧪 Testing the API

### 1. Check Health
```bash
curl http://localhost:5000/api/health
```

### 2. Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the token from the response!

### 4. Create a Trip (Protected - requires token)
```bash
curl -X POST http://localhost:5000/api/trips \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Paris Vacation",
    "destination": "Paris, France",
    "start_date": "2025-07-01",
    "end_date": "2025-07-15",
    "budget": 3000,
    "description": "Summer trip to Paris"
  }'
```

### 5. Get All Trips
```bash
curl http://localhost:5000/api/trips \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📝 API Endpoints Summary

### Authentication
- POST `/api/auth/register` - Register
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user (protected)

### Trips
- GET `/api/trips` - Get all trips (protected)
- GET `/api/trips/:id` - Get single trip (protected)
- POST `/api/trips` - Create trip (protected)
- PUT `/api/trips/:id` - Update trip (protected)
- DELETE `/api/trips/:id` - Delete trip (protected)

### Expenses
- GET `/api/trips/:tripId/expenses` - Get expenses
- POST `/api/trips/:tripId/expenses` - Add expense (protected)
- PUT `/api/trips/:tripId/expenses/:id` - Update expense (protected)
- DELETE `/api/trips/:tripId/expenses/:id` - Delete expense (protected)

### Images
- GET `/api/trips/:tripId/images` - Get images
- POST `/api/trips/:tripId/images` - Upload image (protected)
- DELETE `/api/trips/:tripId/images/:id` - Delete image (protected)

### Comments
- GET `/api/comments/trips/:tripId/comments` - Get trip comments
- POST `/api/comments/trips/:tripId/comments` - Add comment (protected)

## 🔧 Troubleshooting

### Database Connection Error
- Check MySQL is running: `mysql -u root -p`
- Verify credentials in `.env` file
- Ensure database exists: `CREATE DATABASE travelmate_db;`

### Port Already in Use
- Change PORT in `.env` file
- Or stop the process using port 5000

### Module Not Found
- Run `npm install` again
- Delete `node_modules` and run `npm install`

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── models/          # Database models
│   ├── controllers/     # Request handlers
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Helper functions
│   ├── validators/      # Input validation
│   └── server.js        # Main entry point
├── uploads/             # Uploaded files
├── .env                 # Environment variables
└── package.json         # Dependencies
```

## ✅ Next Steps

1. ✅ Backend is running
2. Test all endpoints with Postman/Thunder Client
3. Connect frontend React app
4. Update frontend `axiosInstance.js` baseURL to `http://localhost:5000/api`
5. Remove mock data from frontend `travelApi.js`

## 🎯 Ready for Production?

Before deploying:
- [ ] Change JWT_SECRET to a strong random string
- [ ] Set NODE_ENV=production
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS
- [ ] Set up proper CORS origins
- [ ] Add rate limiting
- [ ] Set up logging
- [ ] Configure database backups

---

**Backend is complete and ready to use! 🎉**
