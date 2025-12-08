import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to TravelMate</h1>
          <p className="hero-subtitle">
            Plan your trips, track expenses, and create memories
          </p>
          <Link to="/dashboard" className="btn-hero">
            Get Started
          </Link> 
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>📅 Trip Planning</h3>
              <p>Organize your travel destinations and itineraries</p>
            </div>
            <div className="feature-card">
              <h3>💰 Expense Tracking</h3>
              <p>Keep track of all your travel expenses in one place</p>
            </div>
            <div className="feature-card">
              <h3>📸 Photo Gallery</h3>
              <p>Store and organize your travel memories</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
