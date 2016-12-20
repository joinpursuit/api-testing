const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

const User = require('./user-model');

//Your code here:
var Song = sequelizeConnection.define('song', {
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



//be sure to export your model as Song
module.exports = Song;
