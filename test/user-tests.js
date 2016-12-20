var expect = require('chai').expect;
var supertest = require('supertest');
var server = require('../server');
var User = require('../models/user-model');
var bodyParser = require('body-parser');

describe('User tests', () => {
  //fake user data that we'll use for tests
  var users = [
    {username: 'test1', email: 'test1@gmail.com', password: 'pass1'},
    {username: 'test2', email: 'test2@gmail.com', password: 'pass2'},
    {username: 'test3', email: 'test3@gmail.com', password: 'pass3'},
  ];
  //you can use 'before' to seed your database with data before your tests
  //you only need one 'before' statement
  //theres also a 'beforeEach' method if you want a function to run before each of your tests, individually
  before(() => {
    return User.sync({force: true})
    .then(() => User.bulkCreate(users))
    .catch((err) => console.log('DB Err!', err));
  });

  //this is just an example of how to do a basic test, in this case to he '/' route
  it(`'/' should respond with 'hello world!'`, (done) => {
    supertest(server)
      .get('/')
      .end((err, res) => {
        expect(res.text).to.eql('hello world!');
        //done is required in order to execute the test
        done();
      })
  });

  //example of how to do a test to get all users route
  it(`'/users' should respond with all users`, (done) => {
    supertest(server)
      .get('/users')
      .end((err, res) => {
        expect(res.body.length).equal(3);
        expect(res.body[0].username).equal(users[0].username);
        expect(res.body[1].username).equal(users[1].username);
        expect(res.body[2].username).equal(users[2].username);
        done();
      })
  });

  it(`'/users/:id' should respond with single user`, (done) => {
    supertest(server)
      .get('/users/1')
      .end((err, res) => {
        expect('test1').equal(users[0].username);
        done();
      })
  });

  it(`'/users/:username should response with username`, (done) => {
    supertest(server)
      .get('/user/test2')
      .end((err, res) => {
        expect('test2').equal(users[1].username);
        done();
      })
  });

  it(`'/users/sort/a-z' should return usernames in abc order`, (done) => {
    supertest(server)
      .get('/users/sort/a-z')
      .end((err, res) => {
        console.log( users.sort(function (a,b) { return a<b} ) )
        //expect('{test1, test2, test3}').equal(users.sort(function (a,b) { return a>b} ));
        done();
      })
  })

    it(`'/users' posting new user !'`, (done) => {
      let newUser = {username: 'test4', email: 'test4@gmail.com', password: 'pass4'}
    supertest(server)
      .post('/users')
      .send(newUser)
      .expect(200)
      .end((err, res) => {
        done();
      })
  });



});

///users/sort/a-z GET users sorted a-z by username








