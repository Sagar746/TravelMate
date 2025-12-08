import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import TripCreatorForm from '../components/TripCreatorForm';
import { getTrips, createTrip } from '../api/travelApi';
import './Dashboard.css';

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const data = await getTrips();
      setTrips(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trips:', error);
      setLoading(false);
    }
  };

  const handleCreateTrip = async (tripData) => {
    try {
      const newTrip = await createTrip(tripData);
      setTrips(prev => [...prev, newTrip]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  };

  const handleTripClick = (tripId) => {
    navigate(`/trip/${tripId}`);
  };

  if (loading) {
    return <div className="dashboard loading">Loading trips...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Trips</h1>
        <button 
          className="btn-new-trip"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ New Trip'}
        </button>
      </div>

      {showForm && (
        <TripCreatorForm onSubmit={handleCreateTrip} />
      )}

      {trips.length === 0 ? (
        <div className="empty-state">
          <p>No trips yet. Create your first trip to get started!</p>
        </div>
      ) : (
        <div className="trips-grid">
          {trips.map((trip) => (
            <Card
              key={trip.id}
              title={trip.name}
              subtitle={trip.destination}
              onClick={() => handleTripClick(trip.id)}
            >
              <div className="trip-dates">
                {trip.startDate} - {trip.endDate}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
