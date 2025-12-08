import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          TravelMate
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          </li>
          {user ? (
            <>
              <li className="navbar-item">
                <span className="navbar-user">👤 {user.username}</span>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-link navbar-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="navbar-item">
              <Link to="/login" className="navbar-link navbar-login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
