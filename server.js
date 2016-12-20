const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const User = require('./models/user-model');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen('9999', () => console.log('Listening on port 9999'));


app.get('/', (req, res) => {
  res.send('hello world!');
});

app.get('/users', (req, res) => {
  User.findAll()
  .then((data) => {
    res.send(data);
  })
});

//makes a new user
app.post('/users', (req,res) => {
  // User.create({username:req.body[0].username, email:req.body[0].email, password: req.body[0].password})
  console.log(req.body);
  // .then((data) => {
  //   res.send(data);
  // })
})

module.exports = app;
