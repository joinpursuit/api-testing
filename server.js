const express = require('express');
const app = express();
const User = require('./models/user-model');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.get('/users', (req, res) => {
  User.findAll()
  .then((data) => {
    res.send(data);
  })
});


app.get('/users/id/:id', (req, res) => {
	User.findById(req.params.id)
	.then((data) => {
		res.send(data)
	})
});

app.get('/users/users/:username', (req, res) => {
	User.findOne({
		where: {
			username: req.params.username		
		}
	})
	.then((data) => {
		res.send(data)
	})
	.catch((err) => {
		console.log('ERROR GETTING BY USERNAME: ', err)
		res.sendStatus(500)
	})
});

app.get('/users/sort/a-z', (req, res) => {
	User.findAll({
		 order: [
		 				['username', 'ASC']
		 ]
	})
	.then((data) => {
		res.send(data)
	})
	.catch((err) => {
		console.log('ERROR SORTING: ', err)
		res.sendStatus(500)
	})
});

app.listen('9000', () => console.log('OVER 9000!!'))

module.exports = app;
