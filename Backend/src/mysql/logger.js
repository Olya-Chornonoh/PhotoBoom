// Logger library
const pino = require('pino');

// Logger configuration
const config = require('../config');

module.exports = pino({
  // use labels for log levels instead of numbers
  useLevelLabels: true,
  // configure level of logging
  level: config.logger.level,
  // use pretty-print only in development environment
  prettyPrint: process.env.NODE_ENV !== 'development' ? false : {
    translateTime: true,
  },
});