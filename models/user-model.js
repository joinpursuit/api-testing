const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

var User = sequelizeConnection.define('users', {
  username: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 50]
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 100]
    }
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 100]
    }
  }
});

module.exports = User;
