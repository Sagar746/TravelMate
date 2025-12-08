import { useState } from 'react';
import FormField from './FormField';
import './TripCreatorForm.css';

function TripCreatorForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
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
      name: '',
      destination: '',
      startDate: '',
      endDate: '',
      budget: '',
      description: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="trip-creator-form">
      <h2>Create New Trip</h2>
      
      <FormField
        label="Trip Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="e.g., Summer Vacation 2025"
        required
      />

      <FormField
        label="Destination"
        name="destination"
        value={formData.destination}
        onChange={handleChange}
        placeholder="e.g., Paris, France"
        required
      />

      <div className="form-row">
        <FormField
          label="Start Date"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <FormField
          label="End Date"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </div>

      <FormField
        label="Budget"
        name="budget"
        type="number"
        value={formData.budget}
        onChange={handleChange}
        placeholder="Enter total budget"
      />

      <div className="form-field">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell us about your trip..."
          className="form-textarea"
          rows="4"
        />
      </div>

      <button type="submit" className="btn-create-trip">
        Create Trip
      </button>
    </form>
  );
}

export default TripCreatorForm;
