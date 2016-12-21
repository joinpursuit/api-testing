const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const User = require('./models/user-model');
const Song = require('./models/song-model');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello world!');
});

//////// USERS ////////////
app.get('/users', (req, res) => {
  User.findAll()
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log(err)
  })
});

app.get('/users/id/:id', (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
		res.send(data);
    })
    .catch((err) => {
    	console.log(err)
    })
})

app.get('/users/:username', (req,res)=>{
    User.findOne({ where: {username: req.params.name} })
    .then((data)=>{
        res.send(data)
    })
})

app.get('/users/sort/a-z', (req, res) => {
  	User.findAll({
      	order:[['username', 'ASC']]
  	})
    .then((data) => {
		res.send(data)
    })
    .catch((err) => {
    	console.log(err)
    })
})

app.post('/users', (req, res) => {
	User.create({ username: req.body.username, email: req.body.email, password: req.body.password}) //We are not using params, we are using the body!!!!!
	.then((data) => {
		res.json(data)
	})
	.catch((err) => {
		console.log(err)
	})
})

//////// SONGS ////////////
app.get('/songs', (req, res) => {
  Song.findAll()
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log(err)
  })
});

app.get('/songs/id/:id', (req, res) => {
  Song.findById(req.params.id)
    .then((data) => {
		res.send(data);
    })
    .catch((err) => {
    	console.log(err)
    })
})

app.get('/songs/:title', (req,res)=>{
    Song.findOne({ where: {title: req.params.name} })
    .then((data)=>{
        res.send(data)
    })
})

app.get('/songs/sort/z-a', (req, res) => {
  	User.findAll({
      	order:[['title', 'DESC']]
  	})
    .then((data) => {
		res.send(data)
    })
    .catch((err) => {
    	console.log(err)
    })
})

app.post('/songs', (req, res) => {
	Song.create({ artist: req.body.artist, title: req.body.title}) //We are not using params, we are using the body!!!!!
	.then((data) => {
		res.json(data)
	})
	.catch((err) => {
		console.log(err)
	})
})

module.exports = app;
