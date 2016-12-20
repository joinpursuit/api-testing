const express = require('express');
const bodyparser = require('body-parser')
const app = express();
const User = require('./models/user-model');
const Song = require('./models/song-model');

app.use(bodyparser.urlencoded({ extended: false }));
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

app.get('/users/id/:id', (req, res) => {
  User.findById(req.params.id)
  .then((data) => {
    res.send(data);
  })
})

app.get('/users/username/:username', (req, res) => {
  User.findAll({where: {username: req.params.username}})
  .then((data) => {
    res.send(data);
  })
})

app.get('/users/sort/a-z', (req, res) => {
  User.findAll({order: "username"})
  .then((data) => {
    res.send(data);
  })
})

app.post('/users', (req, res) => {
  User.create(req.body)
  .then((user) => {
    res.send(user);
  })
})

app.get('/songs', (req, res) => {
  Song.findAll()
  .then((data) => {
    res.send(data);
  })
})


module.exports = app;
