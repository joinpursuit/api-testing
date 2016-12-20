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
  //you can use 'before' to seed your database with data before your tests
  //you only need one 'before' statement
  //theres also a 'beforeEach' method if you want a function to run before each of your tests, individually
  before(() => {
    return User.sync({force: true})
    .then(() => User.bulkCreate(users))
    .catch((err) => console.log('DB Err!', err));
  });

  //this is just an example of how to do a basic test, in this case of the '/' route
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

  ///users/:id GET individual user by id
  it('/users/:id should respond with specific user (by id)', (done) => {
    supertest(server)
      .get('/users/' + 3)
      .end( (err, res) => {
        expect(res.body.username).equal(users[2].username);
        done();
      })
  });

  ////users/:username GET individual user by username
  it('/users/username/:username should respond with specific user (by username)', (done) => {
    supertest(server)
      .get('/users/username/test2')
      .end( (err, res) => {
        expect(res.body.username).equal(users[1].username);
        done();
      })
  });


  ///////users/sort/a-z GET users sorted a-z by username
  it('/users/sort/a-z/ should respond with all users sorted alphabetically by username', (done) => {
    supertest(server)
    .get('/users/sort/a-z/')
    .end( (err, res) => {
      expect(res.body.length).equal(3);
      expect(res.body[0].username).equal(users[0].username);
      expect(res.body[1].username).equal(users[1].username);
      expect(res.body[2].username).equal(users[2].username);
      done();
    })
  });

  ////users POST a new user
  it('/users should create a new user in our database and respond with said user', (done) => {
    supertest(server)
    .post('/users')
    .send({username: "Gabeisbest", email: "best@gmail.com", password: "best123"})
    .end( (err, res) => {
      expect(res.body.username).equal("Gabeisbest");
      expect(res.body.email).equal("best@gmail.com");
      expect(res.body.password).equal("best123");
      done();
    })
  });

});
