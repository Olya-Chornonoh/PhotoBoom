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

try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

 module.exports = sequelize;