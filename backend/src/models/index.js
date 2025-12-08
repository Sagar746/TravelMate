import User from './User.js';
import Trip from './Trip.js';
import Expense from './Expense.js';
import ItineraryDay from './ItineraryDay.js';
import Image from './Image.js';
import Comment from './Comment.js';
import TripCollaborator from './TripCollaborator.js';

// Define associations

// User - Trip (One-to-Many)
User.hasMany(Trip, { foreignKey: 'user_id', as: 'trips' });
Trip.belongsTo(User, { foreignKey: 'user_id', as: 'owner' });

// Trip - Expense (One-to-Many)
Trip.hasMany(Expense, { foreignKey: 'trip_id', as: 'expenses', onDelete: 'CASCADE' });
Expense.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip' });

// Trip - ItineraryDay (One-to-Many)
Trip.hasMany(ItineraryDay, { foreignKey: 'trip_id', as: 'itinerary_days', onDelete: 'CASCADE' });
ItineraryDay.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip' });

// Trip - Image (One-to-Many)
Trip.hasMany(Image, { foreignKey: 'trip_id', as: 'images', onDelete: 'CASCADE' });
Image.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip' });

// User - Image (One-to-Many)
User.hasMany(Image, { foreignKey: 'user_id', as: 'images' });
Image.belongsTo(User, { foreignKey: 'user_id', as: 'uploader' });

// Trip - Comment (One-to-Many)
Trip.hasMany(Comment, { foreignKey: 'trip_id', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip' });

// User - Comment (One-to-Many)
User.hasMany(Comment, { foreignKey: 'user_id', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Image - Comment (One-to-Many) - Optional
Image.hasMany(Comment, { foreignKey: 'image_id', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(Image, { foreignKey: 'image_id', as: 'image' });

// User - Trip (Many-to-Many through TripCollaborator)
User.belongsToMany(Trip, { 
  through: TripCollaborator, 
  foreignKey: 'user_id', 
  otherKey: 'trip_id',
  as: 'collaborating_trips' 
});

Trip.belongsToMany(User, { 
  through: TripCollaborator, 
  foreignKey: 'trip_id', 
  otherKey: 'user_id',
  as: 'collaborators' 
});

// Direct associations for TripCollaborator
TripCollaborator.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
TripCollaborator.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip' });

export {
  User,
  Trip,
  Expense,
  ItineraryDay,
  Image,
  Comment,
  TripCollaborator
};
