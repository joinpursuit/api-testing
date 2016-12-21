// create a Song model in the song-model.js file in the models folder that has the following fields: artist title. userId (this should be created by making an association with the User model, in order to keep track of which user submits which song)

const User = require('./user-model')
const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

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

module.exports = Song


