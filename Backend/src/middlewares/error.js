const {HttpError, InternalServerError} = require('http-errors');

/**
 * @file Common error handling middleware.
 */

const logger = require('../loaders/logger');

function errorHandler(err, _req, res, _next) {
  let error = err;

  // log internal errors
  if (error.status >= 500) {
    logger.error(error);
  }

  // remove stack if not in development
  if (process.env.NODE_ENV !== 'development') {
    delete error.stack;
  }

  // response setting status and error object to body
  res.status(error.status).json({
    status: error.status,
    name: error.name,
    message: error.message,
    stack: error.stack,
  });
}

module.exports = errorHandler;
