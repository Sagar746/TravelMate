import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ItineraryDay = sequelize.define('ItineraryDay', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  trip_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'trips',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  day_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'itinerary_days',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default ItineraryDay;
