import { useState } from 'react';
import FormField from './FormField';
import './ExpenseForm.css';

function ExpenseForm({ onSubmit, tripId }) {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submission
    setFormData({
      amount: '',
      category: '',
      date: '',
      description: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h3>Add New Expense</h3>
      
      <FormField
        label="Amount"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Enter amount"
        required
      />

      <div className="form-field">
        <label htmlFor="category" className="form-label">
          Category<span className="required">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="form-input"
        >
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Accommodation">Accommodation</option>
          <option value="Activities">Activities</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <FormField
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <FormField
        label="Description"
        name="description"
        type="text"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter description"
      />

      <button type="submit" className="btn-submit">
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;
