const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const User = require('./user-model');

var Song = sequelizeConnection.define('song', {
  title: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 50]
    }
  },
  artist: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 100]
    }
  }
});

Song.belongsTo(User);

module.exports = Song;
