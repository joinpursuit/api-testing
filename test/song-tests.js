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
  it(`/songs GET all songs`, (done) => {
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

    it(`'/:id' should respond with one song`, (done) => {
    supertest(server)
      .get('/songs/id/1')
      .end((err, res) => {
        expect(res.body).to.be.a("object");
        expect(res.body.title).equal(`Gangsta's Paradise`);
        expect(res.body.artist).equal("Coolio");
        expect(res.body.userId).equal(1);
        done();
      })
  });
  // /songs/:title GET individual song by title
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
  // /songs/sort/z-a GET songs sorted a-z by artist
     it(`/songs/sort/z-a should GET songs sorted a-z by artist`, (done) => {
    supertest(server)
      .get('/songs/sort/a-z')
      .end((err, res) => {
        expect(res.body).to.be.a("array");
        expect(res.body[0].title).equal(songs[0].title);
        expect(res.body[1].artist).equal(songs[1].artist);
        expect(res.body[2].userId).equal(songs[2].userId);
        done();
      })
  });
       //'/songs' POST a new song
  it(`'/songs' should create one song`, (done) => {
    supertest(server)
      .post('/songs')
      .type('form')
      .send({title: `Gangsta`, artist:'Cool',artistId: 4})
      .end((err, res) => {
        expect(res.body).exist;
        done();
      })
  });


});


