import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TripCollaborator = sequelize.define('TripCollaborator', {
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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  role: {
    type: DataTypes.ENUM('owner', 'editor', 'viewer'),
    defaultValue: 'viewer'
  }
}, {
  tableName: 'trip_collaborators',
  timestamps: true,
  createdAt: 'joined_at',
  updatedAt: false,
  indexes: [
    {
      unique: true,
      fields: ['trip_id', 'user_id']
    }
  ]
});

export default TripCollaborator;
