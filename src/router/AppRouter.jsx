import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import TripDetails from '../pages/TripDetails';
import Expenses from '../pages/Expenses';
import Login from '../pages/Login';

function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trip/:id" element={<TripDetails />} />
        <Route path="/trip/:id/expenses" element={<Expenses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
