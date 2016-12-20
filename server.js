const express = require('express');
const app = express();
const User = require('./models/user-model');

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
  User.findOne({where:{_id: req.params.id}})
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

module.exports = app;
