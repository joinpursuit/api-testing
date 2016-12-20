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

  //Your code here:


  // /songs GET all songs
  it(`'/songs' should respond with all songs`, (done) => {
    supertest(server)
      .get('/songs')
      .end((err, res) => {
        expect(res.body.length).equal(3);
        expect(res.body[0].title).equal(songs[0].title);
        expect(res.body[1].title).equal(songs[1].title);
        expect(res.body[2].title).equal(songs[2].title);
        done();
      })
  });

  // /songs/:id GET individual song by id
  it(`'/songs:id' should provide a specific song`, (done)=>{
    supertest(server)
    .get('/songs/2')
    .end((err, res) => {
      expect(res.body[2].title).equal(songs[2].title);
      done();
    })
  })

   

  // /songs/title/:title GET individual song by title


  // /songs/sort/z-a GET songs sorted a-z by artist


  // /songs POST a new song
});
