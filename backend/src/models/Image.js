import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Image = sequelize.define('Image', {
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
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  caption: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'images',
  timestamps: true,
  createdAt: 'upload_date',
  updatedAt: false
});

export default Image;
