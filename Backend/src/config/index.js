const dotenv = require('dotenv');

dotenv.config();

// Database connection can also be configured by single url
// Url format: <dialect>://<username>:<password>@<hostname>:<port>/<database>
if (process.env.DB_URL) {
  const url = new URL(process.env.DB_URL);

  // Assign individual environment variables from parsed url
  // Last character needs to be removed, because protocol returns 'mysql:'
  process.env.DB_DIALECT = url.protocol.slice(0, -1);
  process.env.DB_USER = url.username;
  process.env.DB_PASSWORD = url.password;

  // First character needs to be removed, because pathname returns '/database'
  process.env.DB_NAME = url.pathname.substr(1);

  process.env.DB_HOST = url.hostname;
  process.env.DB_PORT = url.port;
}

const config = {
  port: process.env.PORT || 3000,

  // Database configuration obtained from container environment
  database: {
    dialect: process.env.DB_DIALECT || 'mysql',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '15082122',
    name: process.env.DB_NAME || 'photo_boom',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
  },

  // Logger configuration obtained from container environment
  logger: {
    level: process.env.LOG_LEVEL || 'debug',
  },

  jwt: { // JSON Web token
    secret: process.env.JWT_SECRET || 'secret',
    issuer: process.env.JWT_ISSUER || 'photo_boom_api',
  },
};

module.exports = config;