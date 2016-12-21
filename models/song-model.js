const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

var Song = sequelizeConnection.define('songs', {
  artist: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 50]
    }
  },
  title: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 100]
    }
  }
});

Song.belongsTo(User)
User.hasMany(Song)

module.exports = Song;
