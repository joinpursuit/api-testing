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

  // GET all songs
  it(`'/songs' should respond with all songs Luis`, (done) => {
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
  it('/songs/id/:id   GET song by id',(done)=>{
    supertest(server)
    .get('/songs/id/3')//1 is like postman
    .end((err,res)=>{
      console.log('res.body=======',res.body)
      expect(res.body).to.be.a("object")
      expect(res.body.title).equal("This is How We Do It")
      expect(res.body.artist).equal('Montell Jordan');
      expect(res.body.userId).equal(3);
      done();
    });
  });


// GET individual song by title
 it(`'/song/:title' gets song by title`, (done)=>{
    supertest(server)
      .get('/songs/title/Ignition (Remix)')
      .end((err, res)=>{
        expect(res.body).to.be.a("object");
        expect(res.body.title).equal("Ignition (Remix)");
        expect(res.body.artist).equal("R. Kelly");
        expect(res.body.userId).equal(2);
        done();
      })
  });

// GET songs sorted a-z by artist
it(`'/songs/sort/z-a GET songs sorted a-z by artist`, (done)=>{
    supertest(server)
      .get('/songs/sort/z-a')
      .end((err, res)=>{
        expect(res.body).to.be.a("array");
        expect(res.body[0].title).equal(songs[0].title);
        expect(res.body[1].artist).equal(songs[1].artist);
        expect(res.body[2].userId).equal(songs[2].userId);
        done();
      })
  });


// POST a new song
  it('/songs POST a new song',(done)=>{
    supertest(server)
    .post('/songs')
    .type('form')
    .send({title:'REACT', artist:'ILIAS'})
    .end((err,res)=>{
      expect(res.body).exist;
      done()
    })
  })
});




