const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const reqLogger = require('express-pino-logger');

const config = require('./config');
const logger = require('./loaders/logger');
const database = require('./loaders/sequelize');
const controllers = require('./controllers');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(reqLogger({logger}));

controllers(app);

const dbPromise =
    database.authenticate()
        .then(() => {
          logger.debug('Connection has been established successfully.');
          // synchronize model schemas with database
          return database.sync();
        })
        .catch(err => {
          logger.error(err);
          // exit with an error if database connection failed
          process.exit(1);
        });

// start listening for requests after database connection established
dbPromise.then(() => {
  app.listen(config.port, () => {
    logger.debug('Server started');
  });
});
