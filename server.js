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

app.get('/users/id/:id',(req,res)=>{
	User.findById(req.params.id)
		.then((data)=>{
			console.log(data)
			res.send(data);
		}).catch((error)=>{
			console.log(error, 'Error with getting users by id')
			res.send(200);
		})
});
app.get('/users/username/:username',(req,res)=>{
	User.findOne({where:{username:req.params.username}})
		.then((data)=>{
			console.log(data)
			res.send(data);
		}).catch((error)=>{
			console.log(error, 'Error with getting users by username')
			res.send(200);
		})
});



module.exports = app;
