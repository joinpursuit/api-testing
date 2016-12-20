var expect = require('chai').expect;
var supertest = require('supertest');
var server = require('../server');
var User = require('../models/user-model');

describe('User tests', () => {
  //fake user data that we'll use for tests
  var users = [
    {username: 'test1', email: 'test1@gmail.com', password: 'pass1'},
    {username: 'test2', email: 'test2@gmail.com', password: 'pass2'},
    {username: 'test3', email: 'test3@gmail.com', password: 'pass3'},
  ];

  //chooses a random user id
  let id = Math.floor(Math.random() * users.length) + 1;

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

  //test to get a single user by id
  it(`'/users/id/:id' should respond with an individual user`, (done) => {
    supertest(server)
      .get(`/users/id/${id}`)
      .end((err, res) => {
        expect(res.body.id).equal(id);
        done();
      })
  })

  //test to get a single user by username
  it(`'/users/username/:username' should get a user by username`, (done) => {
    let username = users[id-1].username;

    supertest(server)
      .get(`/users/username/${username}`)
      .end((err, res) => {
        expect(res.body.length).equal(1);
        expect(res.body[0].username).equal(username);
        done();
      })
  })

  //test to get all users sorted by username
  it(`'/users/sort/a-z' should get all users sorted by username`, (done) => {
    supertest(server)
      .get('/users/sort/a-z')
      .end((err, res) => {
        expect(res.body.length).equal(3);
        expect(res.body[0].username).equal(users[0].username);
        expect(res.body[1].username).equal(users[1].username);
        expect(res.body[2].username).equal(users[2].username);
        done();
      })
  });

  it(`/users should create a new user`, (done) => {
    let newUser = {username: 'test4', email: 'test4@gmail.com', password: 'pass4'};

    supertest(server)
      .post('/users')
      .send(newUser)
      .end((err, res) => {
        expect(res.body.username).equal(newUser.username);
        expect(res.body.email).equal(newUser.email);
        expect(res.body.password).equal(newUser.password);
        done();
      })
  })

})
