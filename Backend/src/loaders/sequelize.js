const Sequelize = require('sequelize');

const logger = require('./logger');
const database = require('../config').database;

const sequelize =
    new Sequelize(database.name, database.username, database.password, {
      host: database.host,
      port: database.port,
      dialect: database.dialect,

    retry: {
        max: 10,
      },

      // Log sequelize messages via common logger
      logging: message => logger.debug(message),
    });

module.exports = sequelize;
