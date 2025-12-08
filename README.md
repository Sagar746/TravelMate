# TravelMate - Travel Planner & Expense Tracker

A simple and clean React application for planning trips and tracking travel expenses.

## Features

- ✅ React functional components with hooks
- ✅ React Router for navigation
- ✅ Reusable components (Card, Navbar, FormField)
- ✅ Interactive components (ExpenseForm, TripCreatorForm)
- ✅ State management with useState and props
- ✅ Axios for API calls (GET & POST)
- ✅ Clean, modular, and scalable code structure

## Project Structure

```
TravelMate/
├── src/
│   ├── api/
│   │   ├── axiosInstance.js    # Axios configuration
│   │   └── travelApi.js         # API functions
│   ├── components/
│   │   ├── Card.jsx             # Reusable card component
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── FormField.jsx        # Reusable form input
│   │   ├── ExpenseForm.jsx      # Interactive expense form
│   │   └── TripCreatorForm.jsx  # Interactive trip creator
│   ├── pages/
│   │   ├── Home.jsx             # Landing page
│   │   ├── Dashboard.jsx        # Trips dashboard
│   │   ├── TripDetails.jsx      # Individual trip details
│   │   └── Expenses.jsx         # Expense tracking page
│   ├── router/
│   │   └── AppRouter.jsx        # React Router setup
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── index.html
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

## Routes

- `/` - Home page
- `/dashboard` - View all trips
- `/trip/:id` - Trip details
- `/trip/:id/expenses` - Trip expenses

## API Setup

The app uses Axios for API calls. Currently configured with mock data for development.

To connect to a real backend:
1. Update the `baseURL` in `src/api/axiosInstance.js`
2. Remove mock data from `src/api/travelApi.js`

Expected backend endpoints:
- `GET /api/trips` - Get all trips
- `GET /api/trips/:id` - Get trip by ID
- `POST /api/trips` - Create new trip
- `POST /api/trips/:id/expenses` - Add expense to trip

## Technologies Used

- React 18
- Vite
- React Router v6
- Axios
- CSS3

## Assignment Requirements Met

✅ Convert static HTML into React components
✅ Use React Router for navigation
✅ At least 3 reusable components (Card, Navbar, FormField)
✅ At least 2 interactive components (ExpenseForm, TripCreatorForm)
✅ Use state and props
✅ Use Axios to make backend API calls (GET + POST)
✅ Clean and minimal code

## Future Enhancements

- Backend integration (Node.js/Express or Firebase)
- User authentication
- Image upload functionality
- Itinerary builder
- Photo gallery
- Comments system

---

Built with React + Vite
