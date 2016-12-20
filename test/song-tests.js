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

  //chooses a random song id
  let id = Math.floor(Math.random() * songs.length) + 1;

  //you can use 'before' to seed your database with data before your tests
  //you only need one 'before' statement
  before(() => {
    return Song.sync({force: true})
    .then(() => Song.bulkCreate(songs))
    .catch((err) => console.log('DB Err!', err));
  });

  it(`'/songs' should get all songs`, (done) => {
    supertest(server)
      .get('/songs')
      .end((err, res) => {
        expect(res.body.length).equal(3);
        expect(res.body[0].title).eql(songs[0].title);
        expect(res.body[1].title).eql(songs[1].title);
        expect(res.body[2].title).eql(songs[2].title);
      })
  })

  it(`'/songs/id/:id' should get an individual song by id`, (done) => {
    supertest(server)
      .get(`/songs/id/${id}`)
      .end((err, res) => {
        expect(res.body.id).equal(id);
      })
  })

  it(`'/songs/title/:title' should get an individual song by title`, (done) => {
    let songTitle = songs[id-1].title;

    supertest(server)
      .get(`/songs/title/${songTitle}`)
      .end((err, res) => {
        expect(res.body.title).equal(songTitle);
      })
  })

  it(`'/songs/sort/a-z' should get all songs sorted by title`, (done) => {
    supertest(server)
      .get('/songs/sort/a-z')
      .end((err, res) => {
        expect(res.body.length).equal(3);
        expect(res.body[0]).eql(songs[0]);
        expect(res.body[1]).eql(songs[1]);
        expect(res.body[2]).eql(songs[2]);
      })
  })

  it(`'/songs' should be able to post a new song to the db`, (done) => {
    let newSong = {title: 'Star Boy', artist:'The Weeknd', userId: 3}

    supertest(server)
      .post('/songs')
      .send(newSong)
      .end((err, res) => {
        expect(res.body.title).equal(newSong.title);
        expect(res.body.artist).equal(newSong.artist);
        expect(res.body.userId).equal(newSong.userId);
      })
  })


});
