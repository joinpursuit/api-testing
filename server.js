const express = require('express');
const app = express();
const User = require('./models/user-model');
const Song = require('./models/song-model');

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
  User.findOne({where:{id:req.params.id}})
  .then((data) => {
    res.send(data);
  })
});

app.get('/users/username/:username', (req, res) => {
  User.findOne({where:{username:req.params.username}})
  .then((data) => {
    res.send(data);
  })
});

app.get('/users/sort/a-z', (req, res) => {
  User.findAll({order:'"username" ASC'})
  .then((data) => {
    res.send(data);
  })
});


//THIS IS MAKING A NEWUSER
app.post('/users', (req, res) => {
  User.create({username:'hi', email:'hi@gmail.com', password:'hi'})
  .then((data) => {
    res.send(data);
  })
});

//GET ALL SONGS
app.get('/songs', (req, res) => {
  Song.findAll()
  .then((data) => {
    res.send(data);
  })
});


//GET ALL SONGS
app.get('/songs/id/:id', (req, res) => {
  Song.findOne({where:{id:req.params.id}})
  .then((data) => {
    res.send(data);
  })
});

// GET individual song by title
app.get('/songs/title/:title', (req, res) => {
  Song.findOne({where:{title:req.params.title}})
  .then((data) => {
    res.send(data);
  })
});


// GET songs sorted a-z by artist
app.get('/songs/sort/z-a', (req, res) => {
  Song.findAll({order:['title']})
  .then((data) => {
    res.send(data);
  })
});

// MAKE A NEWSONG
app.post('/songs', (req, res) => {
  Song.create({title:'REACT', artist:'ILIAS'})
  .then((data) => {
    res.send(data);
  })
});




module.exports = app;
