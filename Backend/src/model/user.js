const database = require('../mysql/sequelize');

const { Sequelize, DataTypes, Model } = require('sequelize');

class User extends Model {}

User.init({
  // Model attributes are defined here
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true
  },
  email: {
    type: DataTypes.STRING
  },
  login: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  passwd: {
      type: DataTypes.STRING
  }
}, {
  // Other model options go here
  sequelize: database, // We need to pass the connection instance
  tableName: 'users',
  modelName: 'User' // We need to choose the model name
});

// the defined model is the class itself
console.log(User === database.models.User); // true

module.exports = User;