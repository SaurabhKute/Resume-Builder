import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';

const errorConverter = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || httpStatus[statusCode];
    err = new ApiError(statusCode, message, false, err.stack);
  }
  next(err);
};

export default errorConverter;
