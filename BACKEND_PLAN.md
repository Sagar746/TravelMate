# TravelMate Backend Development Plan

## 📋 Project Overview
Building a complete Node.js/Express backend for the TravelMate Travel Planner & Expense Tracker application with PostgreSQL/MySQL database.

---

## 🗄️ Database Design (7 Tables)

### **Table Structure:**

#### 1. **users** (Main Entity)
```sql
- id (PK, INT, AUTO_INCREMENT)
- username (VARCHAR(50), UNIQUE, NOT NULL)
- email (VARCHAR(100), UNIQUE, NOT NULL)
- password_hash (VARCHAR(255), NOT NULL)
- full_name (VARCHAR(100))
- profile_image (VARCHAR(255))
- created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE)
```

#### 2. **trips** (Main Entity)
```sql
- id (PK, INT, AUTO_INCREMENT)
- user_id (FK -> users.id, NOT NULL)
- name (VARCHAR(100), NOT NULL)
- destination (VARCHAR(100), NOT NULL)
- start_date (DATE, NOT NULL)
- end_date (DATE, NOT NULL)
- budget (DECIMAL(10,2))
- description (TEXT)
- status (ENUM: 'planning', 'ongoing', 'completed', DEFAULT 'planning')
- created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE)
```

#### 3. **expenses** (Related Entity - One-to-Many with trips)
```sql
- id (PK, INT, AUTO_INCREMENT)
- trip_id (FK -> trips.id, NOT NULL, ON DELETE CASCADE)
- amount (DECIMAL(10,2), NOT NULL)
- category (ENUM: 'Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Other')
- date (DATE, NOT NULL)
- description (VARCHAR(255))
- receipt_image (VARCHAR(255))
- created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
```

#### 4. **itinerary_days** (Related Entity - One-to-Many with trips)
```sql
- id (PK, INT, AUTO_INCREMENT)
- trip_id (FK -> trips.id, NOT NULL, ON DELETE CASCADE)
- day_number (INT, NOT NULL)
- date (DATE, NOT NULL)
- title (VARCHAR(100))
- description (TEXT)
- created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
```

#### 5. **images** (Related Entity - One-to-Many with trips)
```sql
- id (PK, INT, AUTO_INCREMENT)
- trip_id (FK -> trips.id, NOT NULL, ON DELETE CASCADE)
- user_id (FK -> users.id, NOT NULL)
- image_url (VARCHAR(255), NOT NULL)
- caption (VARCHAR(255))
- upload_date (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
```

#### 6. **comments** (Join Table - Many-to-Many relationship)
```sql
- id (PK, INT, AUTO_INCREMENT)
- trip_id (FK -> trips.id, NOT NULL, ON DELETE CASCADE)
- user_id (FK -> users.id, NOT NULL)
- image_id (FK -> images.id, NULL, ON DELETE CASCADE) -- Optional: comment on image
- comment_text (TEXT, NOT NULL)
- created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE)
```

#### 7. **trip_collaborators** (Join Table - Many-to-Many relationship)
```sql
- id (PK, INT, AUTO_INCREMENT)
- trip_id (FK -> trips.id, NOT NULL, ON DELETE CASCADE)
- user_id (FK -> users.id, NOT NULL)
- role (ENUM: 'owner', 'editor', 'viewer', DEFAULT 'viewer')
- joined_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- UNIQUE(trip_id, user_id)
```

### **Relationships:**
- **One-to-Many:** users → trips (one user has many trips)
- **One-to-Many:** trips → expenses (one trip has many expenses)
- **One-to-Many:** trips → itinerary_days (one trip has many itinerary days)
- **One-to-Many:** trips → images (one trip has many images)
- **Many-to-Many:** users ↔ trips (via trip_collaborators - users can collaborate on multiple trips)
- **Many-to-Many:** users ↔ images (via comments - users can comment on multiple images)
- **One-to-Many:** trips → comments (one trip has many comments)

---

## 🏗️ Backend Technology Stack

### **Core Technologies:**
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** MySQL or PostgreSQL
- **ORM:** Sequelize or Prisma (recommended)
- **Authentication:** JWT (JSON Web Tokens) + bcrypt
- **File Upload:** Multer
- **Validation:** Joi or express-validator
- **Environment:** dotenv

### **Additional Packages:**
```json
{
  "express": "^4.18.2",
  "mysql2": "^3.6.5",
  "sequelize": "^6.35.2",
  "bcrypt": "^5.1.1",
  "jsonwebtoken": "^9.0.2",
  "multer": "^1.4.5-lts.1",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "joi": "^17.11.0",
  "morgan": "^1.10.0",
  "helmet": "^7.1.0"
}
```

---

## 📁 Backend Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js          # Database configuration
│   │   ├── auth.js              # JWT configuration
│   │   └── multer.js            # File upload configuration
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Trip.js              # Trip model
│   │   ├── Expense.js           # Expense model
│   │   ├── ItineraryDay.js      # Itinerary model
│   │   ├── Image.js             # Image model
│   │   ├── Comment.js           # Comment model
│   │   ├── TripCollaborator.js  # Collaborator model
│   │   └── index.js             # Model associations
│   ├── controllers/
│   │   ├── authController.js    # Register, login, logout
│   │   ├── tripController.js    # CRUD for trips
│   │   ├── expenseController.js # CRUD for expenses
│   │   ├── itineraryController.js
│   │   ├── imageController.js   # Image upload & fetch
│   │   ├── commentController.js # Comments CRUD
│   │   └── userController.js    # User profile
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── tripRoutes.js
│   │   ├── expenseRoutes.js
│   │   ├── itineraryRoutes.js
│   │   ├── imageRoutes.js
│   │   ├── commentRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification
│   │   ├── errorHandler.js      # Global error handling
│   │   ├── validation.js        # Input validation
│   │   └── uploadMiddleware.js  # File upload handling
│   ├── utils/
│   │   ├── tokenUtils.js        # JWT helper functions
│   │   ├── passwordUtils.js     # Bcrypt helpers
│   │   └── responseUtils.js     # Standard API responses
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── tripValidator.js
│   │   └── expenseValidator.js
│   └── server.js                # Main entry point
├── uploads/
│   ├── images/                  # Uploaded trip images
│   └── receipts/                # Uploaded receipt images
├── .env                         # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## 🔌 API Endpoints Design

### **Authentication Routes** (`/api/auth`)
```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login user (returns JWT)
POST   /api/auth/logout          - Logout user
GET    /api/auth/me              - Get current user info (protected)
PUT    /api/auth/update-profile  - Update user profile (protected)
```

### **Trip Routes** (`/api/trips`)
```
GET    /api/trips                - Get all trips for logged-in user
GET    /api/trips/:id            - Get single trip by ID
POST   /api/trips                - Create new trip (protected)
PUT    /api/trips/:id            - Update trip (protected)
DELETE /api/trips/:id            - Delete trip (protected)
GET    /api/trips/:id/summary    - Get trip summary with totals
```

### **Expense Routes** (`/api/trips/:tripId/expenses`)
```
GET    /api/trips/:tripId/expenses           - Get all expenses for a trip
GET    /api/trips/:tripId/expenses/:id       - Get single expense
POST   /api/trips/:tripId/expenses           - Add new expense
PUT    /api/trips/:tripId/expenses/:id       - Update expense
DELETE /api/trips/:tripId/expenses/:id       - Delete expense
GET    /api/trips/:tripId/expenses/category  - Get expenses grouped by category
```

### **Itinerary Routes** (`/api/trips/:tripId/itinerary`)
```
GET    /api/trips/:tripId/itinerary     - Get all itinerary days
GET    /api/trips/:tripId/itinerary/:id - Get single day
POST   /api/trips/:tripId/itinerary     - Add itinerary day
PUT    /api/trips/:tripId/itinerary/:id - Update itinerary day
DELETE /api/trips/:tripId/itinerary/:id - Delete itinerary day
```

### **Image Routes** (`/api/trips/:tripId/images`)
```
GET    /api/trips/:tripId/images        - Get all images for trip
POST   /api/trips/:tripId/images        - Upload new image (multipart/form-data)
DELETE /api/trips/:tripId/images/:id    - Delete image
PUT    /api/trips/:tripId/images/:id    - Update image caption
```

### **Comment Routes** (`/api/comments`)
```
GET    /api/trips/:tripId/comments        - Get all comments for trip
POST   /api/trips/:tripId/comments        - Add comment to trip
POST   /api/images/:imageId/comments      - Add comment to image
PUT    /api/comments/:id                  - Update comment
DELETE /api/comments/:id                  - Delete comment
```

### **Collaborator Routes** (`/api/trips/:tripId/collaborators`)
```
GET    /api/trips/:tripId/collaborators     - Get all collaborators
POST   /api/trips/:tripId/collaborators     - Add collaborator
PUT    /api/trips/:tripId/collaborators/:id - Update collaborator role
DELETE /api/trips/:tripId/collaborators/:id - Remove collaborator
```

---

## 🔐 Authentication Flow

### **Registration:**
1. User submits registration form (username, email, password)
2. Backend validates input
3. Hash password using bcrypt
4. Create user in database
5. Return success response

### **Login:**
1. User submits login credentials
2. Backend validates credentials
3. Compare password with stored hash
4. Generate JWT token (expires in 7 days)
5. Return token + user info

### **Protected Routes:**
1. Frontend sends JWT in Authorization header: `Bearer <token>`
2. Middleware verifies token
3. Attach user info to request object
4. Proceed to controller

---

## 📤 File Upload Strategy

### **Image Upload Flow:**
1. User selects image file
2. Frontend sends multipart/form-data request
3. Multer middleware processes upload
4. Save file to `uploads/images/` folder
5. Store file path in database
6. Return image URL to frontend

### **File Naming Convention:**
```
Format: {timestamp}-{userId}-{originalName}
Example: 1733702400000-15-paris-eiffel.jpg
```

### **Allowed File Types:**
- Images: .jpg, .jpeg, .png, .gif, .webp
- Max size: 5MB per image

---

## ✅ Validation Rules

### **Trip Validation:**
- name: required, 3-100 characters
- destination: required, 2-100 characters
- start_date: required, valid date
- end_date: required, must be after start_date
- budget: optional, positive number

### **Expense Validation:**
- amount: required, positive number
- category: required, valid enum value
- date: required, valid date
- description: optional, max 255 characters

### **User Validation:**
- email: required, valid email format
- password: required, min 8 characters, must contain letter + number
- username: required, 3-50 characters, alphanumeric only

---

## 🛡️ Security Measures

1. **Password Security:** bcrypt with salt rounds = 10
2. **JWT Secret:** Strong random string stored in .env
3. **CORS:** Configure allowed origins
4. **Helmet:** Security headers
5. **Input Validation:** Sanitize all user inputs
6. **SQL Injection:** Use parameterized queries (ORM handles this)
7. **Rate Limiting:** Prevent brute force attacks
8. **File Upload:** Validate file types and sizes

---

## 🔄 Database Seeding (for testing)

### **Seed Data:**
- 3 sample users
- 5 sample trips (distributed among users)
- 15-20 expenses across trips
- 10 itinerary days
- 8-10 sample images
- 12-15 comments
- 3-4 collaborator relationships

---

## 🧪 Testing Strategy

### **API Testing:**
- Use **Postman** or **Thunder Client** for manual testing
- Test all CRUD operations
- Test authentication flow
- Test file uploads
- Test error handling
- Test edge cases (invalid data, missing fields)

### **Test Scenarios:**
1. Register new user
2. Login with valid/invalid credentials
3. Create trip (authenticated)
4. Add expenses to trip
5. Upload images
6. Add comments
7. Update trip details
8. Delete trip (cascade delete expenses, images, etc.)

---

## 📊 Database Diagram Instructions

### **Using draw.io:**
1. Go to https://app.diagrams.net/
2. Create new diagram
3. Add 7 tables as entities
4. For each table:
   - Add table name as header
   - List all columns with data types
   - Mark primary keys (PK)
   - Mark foreign keys (FK)
5. Draw relationships:
   - **One-to-Many:** Single line with crow's foot
   - **Many-to-Many:** Through join table
6. Color code:
   - Main entities (users, trips): Blue
   - Related entities (expenses, images): Green
   - Join tables (comments, trip_collaborators): Orange
7. Export as PNG/JPEG
8. Save to `/docs/database-diagram.png`

### **Relationship Lines:**
```
users (1) ----< (many) trips
trips (1) ----< (many) expenses
trips (1) ----< (many) itinerary_days
trips (1) ----< (many) images
trips (1) ----< (many) comments
users (many) >----< (many) trips (via trip_collaborators)
users (many) >----< (many) images (via comments)
```

---

## 🚀 Implementation Steps

### **Phase 1: Setup (Day 1)**
1. Initialize Node.js project
2. Install dependencies
3. Set up folder structure
4. Configure database connection
5. Create .env file

### **Phase 2: Database (Day 2)**
1. Create all 7 models
2. Define associations
3. Create database migration/sync
4. Test database connections

### **Phase 3: Authentication (Day 3)**
1. Implement user registration
2. Implement login/logout
3. Create JWT middleware
4. Test authentication flow

### **Phase 4: Core Features (Day 4-5)**
1. Implement trip CRUD
2. Implement expense CRUD
3. Implement itinerary CRUD
4. Test all endpoints

### **Phase 5: Advanced Features (Day 6)**
1. Implement image upload
2. Implement comments
3. Implement collaborators
4. Add validation

### **Phase 6: Testing & Documentation (Day 7)**
1. Test all endpoints
2. Create API documentation
3. Create database diagram
4. Write README

---

## 📝 Environment Variables (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=travelmate_db
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRE=7d

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

---

## 📈 Success Criteria

✅ **Minimum 7 tables** in database (includes join tables)  
✅ **At least 2 join tables** (comments, trip_collaborators)  
✅ **One-to-Many relationships** (users→trips, trips→expenses, etc.)  
✅ **Many-to-Many relationships** (users↔trips, users↔images via comments)  
✅ **Complete API** for all CRUD operations  
✅ **Authentication** with JWT  
✅ **File upload** functionality  
✅ **Database diagram** created with draw.io  
✅ **Input validation** on all endpoints  
✅ **Error handling** implemented  

---

## 🎯 Next Steps After Backend Completion

1. Connect frontend to real backend API
2. Remove mock data from `travelApi.js`
3. Implement authentication in frontend (AuthContext)
4. Add image upload functionality
5. Add comments feature
6. Test full-stack integration
7. Deploy to production (Heroku, Railway, or Render)

---

**Ready to start building? Follow the implementation steps and refer to this plan throughout development!**
