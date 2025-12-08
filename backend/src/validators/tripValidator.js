import Joi from 'joi';

export const createTripSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Trip name must be at least 3 characters long',
      'string.max': 'Trip name must not exceed 100 characters',
      'any.required': 'Trip name is required'
    }),
  
  destination: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Destination must be at least 2 characters long',
      'string.max': 'Destination must not exceed 100 characters',
      'any.required': 'Destination is required'
    }),
  
  start_date: Joi.date()
    .iso()
    .required()
    .messages({
      'date.format': 'Start date must be in ISO format (YYYY-MM-DD)',
      'any.required': 'Start date is required'
    }),
  
  end_date: Joi.date()
    .iso()
    .greater(Joi.ref('start_date'))
    .required()
    .messages({
      'date.format': 'End date must be in ISO format (YYYY-MM-DD)',
      'date.greater': 'End date must be after start date',
      'any.required': 'End date is required'
    }),
  
  budget: Joi.number()
    .positive()
    .precision(2)
    .optional()
    .allow(null),
  
  description: Joi.string()
    .optional()
    .allow(''),
  
  status: Joi.string()
    .valid('planning', 'ongoing', 'completed')
    .optional()
});

export const updateTripSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .optional(),
  
  destination: Joi.string()
    .min(2)
    .max(100)
    .optional(),
  
  start_date: Joi.date()
    .iso()
    .optional(),
  
  end_date: Joi.date()
    .iso()
    .optional(),
  
  budget: Joi.number()
    .positive()
    .precision(2)
    .optional()
    .allow(null),
  
  description: Joi.string()
    .optional()
    .allow(''),
  
  status: Joi.string()
    .valid('planning', 'ongoing', 'completed')
    .optional()
});
