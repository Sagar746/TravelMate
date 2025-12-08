import Joi from 'joi';

export const createExpenseSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      'number.positive': 'Amount must be a positive number',
      'any.required': 'Amount is required'
    }),
  
  category: Joi.string()
    .valid('Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Other')
    .required()
    .messages({
      'any.only': 'Category must be one of: Food, Transport, Accommodation, Activities, Shopping, Other',
      'any.required': 'Category is required'
    }),
  
  date: Joi.date()
    .iso()
    .required()
    .messages({
      'date.format': 'Date must be in ISO format (YYYY-MM-DD)',
      'any.required': 'Date is required'
    }),
  
  description: Joi.string()
    .max(255)
    .optional()
    .allow('')
});

export const updateExpenseSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .precision(2)
    .optional(),
  
  category: Joi.string()
    .valid('Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Other')
    .optional(),
  
  date: Joi.date()
    .iso()
    .optional(),
  
  description: Joi.string()
    .max(255)
    .optional()
    .allow('')
});
