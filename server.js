const express = require('express');
const app = express();
const bodyparser = require('body-parser');

const User = require('./models/user-model');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.get('/users', (req, res) => {
  User.findAll()
  .then((data) => {
    res.send(data);
  })
});

// /users/:id GET individual user by id
app.get('/users/:id', (req, res) => {
	User.findById(req.params.id)
	.then( (user) => {
		res.send(user);
	})
	.catch( (err) => {
		console.log(err);
		res.sendStatus(500);
	})
});

// /users/:username GET individual user by username
app.get('/users/username/:username', (req, res) => {
	User.findOne({
		where: {username: req.params.username}
	})
	.then( (user) => {
		res.send(user);
	})
	.catch( (err) => {
		console.log(err);
		res.sendStatus(500);
	})
});
// /users/sort/a-z GET users sorted a-z by username
app.get('/users/sort/a-z', (req, res) => {
	User.findAll({
		order: [ ['username', 'ASC'] ]
	})
	.then( (users) => {
		res.send(users);
	})
	.catch( (err) => {
		console.log(err);
		res.sendStatus(500);
	})
});
// /users POST a new user
app.post('/users', (req, res) => {
	User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	})
	.then( (newUser) => {
		res.send(newUser);
	})
	.catch( (err) => {
		console.log(err);
		res.sendStatus(500);
	})
});


module.exports = app;
