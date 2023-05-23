const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
var should = require('chai').should();
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests Part 2', () => {
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function(done) {
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
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function(done) {
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
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function(done) {
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
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function(done) {
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
});
