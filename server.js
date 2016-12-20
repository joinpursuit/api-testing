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

app.get('/user/id/:id', (req, res) => {
  User.findOne({where:
  				{id: req.params.id}
  			})
  .then((data) => {
    res.send(data);
  })
});

app.get('/user/username/:username', (req, res) => {
	console.log(req.params.username)
    User.findOne({ where: 
    		{ username: req.params.username } 
    	})
    	.then(data=>{
    		res.send(data);
    	})
})
app.get('/users/sort/a-z', (req, res) => {
    User.findAll(
    			{
		    		order: ['username']
    			}
			)
        .then((data) => {
            res.send(data);
        })
});
 
app.get('/songs', (req, res) => {
    Song.findAll()
        .then((data) => {
            res.send(data);
        })
});

app.get('/songs/id/:id', (req, res) => {
	console.log(req.params)
  Song.findOne({where:
  				{id: req.params.id}
  			})
  .then((data) => {
    res.send(data);
  })
});

app.get('/songs/title/:title', (req, res) => {
	console.log(req.params.title)
    Song.findOne({ where: 
    		{ title: req.params.title } 
    	})
    	.then(data=>{
    		console.log(data);
    		res.send(data);
    	})
})
app.get('/songs/sort/a-z', (req, res) => {
    Song.findAll(
    			{
		    		order: ['title']
    			}
			)
        .then((data) => {
            res.send(data);
        })
});
 


module.exports = app;
