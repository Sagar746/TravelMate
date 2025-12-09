import axiosInstance from './axiosInstance';

// No mock data: API must be available for app to work
const mockTrips = [];

// Get all trips
export const getTrips = async () => {
  try {
    const response = await axiosInstance.get('/trips');
    // Backend returns { success, message, data }
    const trips = response.data.data;
    // Map backend snake_case to frontend camelCase
    return trips.map(mapTripFromApi);
  } catch (error) {
    // Do not fall back to mock data. Let caller handle the error.
    throw error;
  }
};

// Get trip by ID
export const getTripById = async (id) => {
  try {
    const response = await axiosInstance.get(`/trips/${id}`);
    return mapTripFromApi(response.data.data);
  } catch (error) {
    // Do not fall back to mock data. Let caller handle the error.
    throw error;
  }
};

// Create new trip
export const createTrip = async (tripData) => {
  try {
    // Convert camelCase frontend fields to snake_case expected by backend
    const payload = {
      name: tripData.name,
      destination: tripData.destination,
      start_date: tripData.startDate,
      end_date: tripData.endDate,
      budget: tripData.budget ? parseFloat(tripData.budget) : null,
      description: tripData.description
    };

    const response = await axiosInstance.post('/trips', payload);
    return mapTripFromApi(response.data.data);
  } catch (error) {
    // Do not fall back to mock data. Let caller handle the error.
    throw error;
  }
};

// Add expense to trip
export const addExpense = async (tripId, expenseData) => {
  try {
    const response = await axiosInstance.post(`/trips/${tripId}/expenses`, expenseData);
    return response.data.data;
  } catch (error) {
    // Do not fall back to mock data. Let caller handle the error.
    throw error;
  }
};

// Helper: map trip object from backend (snake_case) to frontend (camelCase)
function mapTripFromApi(trip) {
  if (!trip) return trip;
  return {
    ...trip,
    id: trip.id,
    name: trip.name,
    destination: trip.destination,
    startDate: trip.start_date,
    endDate: trip.end_date,
    budget: trip.budget,
    description: trip.description,
    totalExpenses: trip.totalExpenses ?? 0,
    days: trip.days ?? Math.ceil((new Date(trip.end_date) - new Date(trip.start_date)) / (1000 * 60 * 60 * 24)),
    expenses: trip.expenses || [],
    images: trip.images || [],
    collaborators: trip.collaborators || []
  };
}

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
