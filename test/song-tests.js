var expect = require('chai').expect;
var supertest = require('supertest');
var server = require('../server');
var Song = require('../models/song-model');

describe('Song tests', () => {
  //fake user data that we'll use for tests
  var songs = [
    {title: `Gangsta's Paradise`, artist:'Coolio', userId: 1},
    {title: `Ignition (Remix)`, artist:'R. Kelly', userId: 2},
    {title: `This is How We Do It`, artist:'Montell Jordan', userId: 3}
  ];
  //you can use 'before' to seed your database with data before your tests
  //you only need one 'before' statement
  before(() => {
    return Song.sync({force: true})
    .then(() => Song.bulkCreate(songs))
    .catch((err) => console.log('DB Err!', err));
  });

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
  it(`'/songs' should respond with all songs`, (done) => {
    supertest(server)
      .get('/songs')
      .end((err, res) => {
        expect(res.body.length).equal(3);
        expect({res.body[0].artist, res.body[0].title}).equal({songs[0].artist, songs[0].title });
        expect({res.body[1].artist, res.body[1].title}).equal({songs[1].artist, songs[1].title });
        expect({res.body[2].artist, res.body[2].title}).equal({songs[2].x, songs[2].title });
        done();
      })
  });
  it(`'/songs/:id' should respond with specific song`, (done) => {
    supertest(server)
      .get('/songs/id/1')
      .end((err, res) => {
        expect(res.body.id).equal(1);
        done();
      })
  });
  it(`'/songs/:title' should respond with specific song title`, (done) => {
    supertest(server)
      .get('/songs/Ignition-(Remix)')
      .end((err, res) => {
        expect(res.body.username).eql(users.username);
        done();
      })
  });
  it(`'/songs/sort/z-a' should respond with users sorted by title, in reverse`, (done) => {
    supertest(server)
      .get('/songs/sort/z-a')
      .end((err, res) => {
        expect(res.body.length).eql(3);
        expect({res.body[2].title, res.body[2].artist}).equal({songs[2].title, songs[2].artist });
        expect({res.body[1].title, res.body[1].artist}).equal({songs[1].title, songs[1].artist });
        expect({res.body[0].title, res.body[0].artist}).equal({songs[0].title, songs[0].artist });
        done();
      })
  });
  // http://visionmedia.github.io/superagent/#response-properties
  it(`'/songs' should create a new song`, (done) => {
    supertest(server)
      .post('/songs')
      .send({ title: 'Love Deluxe', artist: 'Sade', userId })
      .set('X-API-Key', 'foobar')
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (err || !res.ok) {
          console.log('Oh no! error');
        } else {
          console.log('yay got ' + JSON.stringify(res.body));
        }
        done();
      })
    })
})
