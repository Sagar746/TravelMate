import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTripById } from '../api/travelApi';
import './TripDetails.css';

function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTripDetails();
  }, [id]);

  const fetchTripDetails = async () => {
    try {
      const data = await getTripById(id);
      setTrip(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trip details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="trip-details loading">Loading trip details...</div>;
  }

  if (!trip) {
    return <div className="trip-details error">Trip not found</div>;
  }

  return (
    <div className="trip-details">
      <div className="trip-header">
        <h1>{trip.name}</h1>
        <p className="trip-destination">📍 {trip.destination}</p>
        <p className="trip-dates">
          {trip.startDate} - {trip.endDate}
        </p>
      </div>

      <div className="trip-description">
        <h2>Description</h2>
        <p>{trip.description || 'No description available'}</p>
      </div>

      {trip.budget && (
        <div className="trip-budget">
          <h2>Budget</h2>
          <p className="budget-amount">${trip.budget}</p>
        </div>
      )}

      <div className="trip-actions">
        <Link to={`/trip/${id}/expenses`} className="btn-action">
          View Expenses
        </Link>
      </div>

      <div className="trip-stats">
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p className="stat-value">${trip.totalExpenses || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Days</h3>
          <p className="stat-value">{trip.days || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;
