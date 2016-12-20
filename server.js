const express = require('express');
const app = express();
const User = require('./models/user-model');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

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
    res.send(data);
  })
});

app.get('/users/username/:username', (req, res) => {
  User.findOne({
    where: {username: req.params.username}
  })
  .then((data) => {
    res.send(data);
  })
});

app.get('/users/sort/a-z', (req, res) => {
  User.findAll({
    order: [["username", "DESC"]]
  })
  .then((data) => {
    res.send(data);
  })
});

app.post('/users', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then((data)=>{
    res.send(data);
  })
});


module.exports = app;
