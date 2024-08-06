// src/middleware/errorHandler.js

import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';

const SHOW_STACK_TRACE = process.env.SHOW_STACK_TRACE === 'true';

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    // Handle known API errors
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        ...(SHOW_STACK_TRACE && { stack: err.stack })
      }
    });
  }

  // Handle unknown errors
  res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
    error: {
      message: err.message || 'An unexpected error occurred',
      ...(SHOW_STACK_TRACE && { stack: err.stack })
    }
  });
};

export default errorHandler;
