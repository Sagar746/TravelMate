import axiosInstance from './axiosInstance';

// Mock data for development (remove when backend is ready)
const mockTrips = [
  {
    id: 1,
    name: 'Summer Vacation 2025',
    destination: 'Paris, France',
    startDate: '2025-07-01',
    endDate: '2025-07-15',
    budget: 3000,
    description: 'Exploring the city of lights',
    expenses: [
      { amount: 45, category: 'Food', date: '2025-07-01', description: 'Dinner at cafe' },
      { amount: 120, category: 'Accommodation', date: '2025-07-01', description: 'Hotel night 1' }
    ],
    totalExpenses: 165,
    days: 14
  },
  {
    id: 2,
    name: 'Beach Getaway',
    destination: 'Bali, Indonesia',
    startDate: '2025-08-10',
    endDate: '2025-08-20',
    budget: 2500,
    description: 'Relaxing on tropical beaches',
    expenses: [],
    totalExpenses: 0,
    days: 10
  }
];

// Get all trips
export const getTrips = async () => {
  try {
    const response = await axiosInstance.get('/trips');
    return response.data;
  } catch (error) {
    console.log('Using mock data - backend not available');
    // Return mock data if backend is not available
    return mockTrips;
  }
};

// Get trip by ID
export const getTripById = async (id) => {
  try {
    const response = await axiosInstance.get(`/trips/${id}`);
    return response.data;
  } catch (error) {
    console.log('Using mock data - backend not available');
    // Return mock data if backend is not available
    return mockTrips.find(trip => trip.id === parseInt(id)) || null;
  }
};

// Create new trip
export const createTrip = async (tripData) => {
  try {
    const response = await axiosInstance.post('/trips', tripData);
    return response.data;
  } catch (error) {
    console.log('Using mock data - backend not available');
    // Return mock data if backend is not available
    const newTrip = {
      id: Date.now(),
      ...tripData,
      expenses: [],
      totalExpenses: 0,
      days: 0
    };
    mockTrips.push(newTrip);
    return newTrip;
  }
};

// Add expense to trip
export const addExpense = async (tripId, expenseData) => {
  try {
    const response = await axiosInstance.post(`/trips/${tripId}/expenses`, expenseData);
    return response.data;
  } catch (error) {
    console.log('Using mock data - backend not available');
    // Return mock data if backend is not available
    const newExpense = {
      id: Date.now(),
      ...expenseData
    };
    const trip = mockTrips.find(t => t.id === parseInt(tripId));
    if (trip) {
      trip.expenses.push(newExpense);
      trip.totalExpenses += parseFloat(expenseData.amount);
    }
    return newExpense;
  }
};

// Upload image
export const uploadImage = async (tripId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await axiosInstance.post(`/trips/${tripId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Add comment
export const addComment = async (tripId, commentText) => {
  try {
    const response = await axiosInstance.post(`/trips/${tripId}/comments`, {
      text: commentText
    });
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};
