import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import './Login.css';

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: ''
    
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister 
        ? formData 
        : { email: formData.email, password: formData.password };

      const response = await fetch(`http://localhost:5000/api${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        if (isRegister) {
          alert('Registration successful! Please login.');
          setIsRegister(false);
          setFormData({ username: '', email: '', password: '', full_name: '' });
        } else {
          // Save token to localStorage
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user', JSON.stringify(data.data.user));
          alert('Login successful!');
          navigate('/dashboard');
        }
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>{isRegister ? 'Create Account' : 'Login'}</h1>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {isRegister && (
            <>
              <FormField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
              />
              <FormField
                label="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </>
          )}

          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Please wait...' : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>

        <p className="toggle-form">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          {' '}
          <button 
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="link-button"
          >
            {isRegister ? 'Login here' : 'Register here'}
          </button>
        </p>

        <div className="backend-status">
          <p>🔌 Backend: <strong>http://localhost:5000</strong></p>
          <p>💾 Database: <strong>travelmate_db</strong></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
