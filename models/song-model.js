const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const User = require('./user-model');

const Song = sequelizeConnection.define('Song', {
  artist: Sequelize.STRING,
  title: Sequelize.STRING
})

Song.belongsTo(User)

module.exports = Song
