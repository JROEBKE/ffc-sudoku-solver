const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
var should = require('chai').should();
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests Part 2', () => {
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check - col 0', function(done) {
      chai.request(server)
      .post('/api/check')
      .send({
          "puzzle":"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          "coordinate":"A0",
          "value":"6"
      })
      .end(function(err, res){          
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Invalid coordinate');
        done();
      })
  });
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check - invalid row J', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
        "puzzle":"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        "coordinate":"J1",
        "value":"6"
    })
    .end(function(err, res){          
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('error').eql('Invalid coordinate');
      done();
    })
  });
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check - no col defined', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
        "puzzle":"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        "coordinate":"A",
        "value":"6"
    })
    .end(function(err, res){          
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('error').eql('Invalid coordinate');
      done();
    })
  });
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check - no row defined', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
        "puzzle":"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        "coordinate":"1",
        "value":"6"
    })
    .end(function(err, res){          
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('error').eql('Invalid coordinate');
      done();
    })
  });
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check - length coordinate', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
        "puzzle":"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        "coordinate":"A10",
        "value":"6"
    })
    .end(function(err, res){          
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');      
      res.body.should.have.property('error').eql('Invalid coordinate');
      done();
    })
  });
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check - length coordinate 2', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
        "puzzle":"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        "coordinate":"AB10",
        "value":"6"
    })
    .end(function(err, res){          
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');      
      res.body.should.have.property('error').eql('Invalid coordinate');
      done();
    })
  });
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check - invalid row number', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
        "puzzle":"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        "coordinate":"01",
        "value":"6"
    })
    .end(function(err, res){          
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('error').eql('Invalid coordinate');
      done();
    })
  });
  test('Check a puzzle placement with missing required fields: POST request to /api/check - coordinate', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
      "puzzle":"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
      "coordinate":"",
      "value":"1"
    })
    .end(function(err, res){          
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('error').eql('Required field(s) missing');
      done();
    })
  });
  test('Check a puzzle placement with missing required fields: POST request to /api/check - puzzle', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
      "puzzle":"",
      "coordinate":"A1",
      "value":"1"
    })
    .end(function(err, res){          
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('error').eql('Required field(s) missing');
      done();
    })
  });
});
