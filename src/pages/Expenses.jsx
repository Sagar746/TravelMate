import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import { getTripById, addExpense } from '../api/travelApi';
import './Expenses.css';

function Expenses() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTripData();
  }, [id]);

  const fetchTripData = async () => {
    try {
      const data = await getTripById(id);
      setTrip(data);
      setExpenses(data.expenses || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trip data:', error);
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const newExpense = await addExpense(id, expenseData);
      setExpenses(prev => [...prev, newExpense]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const calculateTotal = () => {
    return expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
  };

  const getCategoryTotal = (category) => {
    return expenses
      .filter(exp => exp.category === category)
      .reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
  };

  if (loading) {
    return <div className="expenses loading">Loading expenses...</div>;
  }

  return (
    <div className="expenses">
      <div className="expenses-header">
        <Link to={`/trip/${id}`} className="back-link">← Back to Trip</Link>
        <h1>Expenses for {trip?.name}</h1>
      </div>

      <div className="expenses-content">
        <div className="expenses-form-section">
          <ExpenseForm onSubmit={handleAddExpense} tripId={id} />
        </div>

        <div className="expenses-list-section">
          <div className="expenses-summary">
            <h2>Total Expenses</h2>
            <p className="total-amount">${calculateTotal().toFixed(2)}</p>
          </div>

          {expenses.length === 0 ? (
            <div className="empty-expenses">
              <p>No expenses yet. Add your first expense!</p>
            </div>
          ) : (
            <div className="expenses-list">
              <h3>All Expenses</h3>
              {expenses.map((expense, index) => (
                <div key={index} className="expense-item">
                  <div className="expense-header-row">
                    <span className="expense-category">{expense.category}</span>
                    <span className="expense-amount">${expense.amount}</span>
                  </div>
                  <div className="expense-details">
                    <span className="expense-date">{expense.date}</span>
                    {expense.description && (
                      <span className="expense-description">{expense.description}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {expenses.length > 0 && (
            <div className="category-breakdown">
              <h3>By Category</h3>
              {['Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Other'].map(category => {
                const total = getCategoryTotal(category);
                return total > 0 ? (
                  <div key={category} className="category-item">
                    <span>{category}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Expenses;
