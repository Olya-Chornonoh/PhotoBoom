const database = require('../loaders/sequelize');

const { Sequelize, DataTypes, Model } = require('sequelize');

class User extends Model {}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  login: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
  sequelize: database, // We need to pass the connection instance
  tableName: 'users',
  modelName: 'User' // We need to choose the model name
});

module.exports = User;
