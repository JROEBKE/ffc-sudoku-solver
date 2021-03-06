const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
var should = require('chai').should();
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    // api/solve tests
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done) {
        chai.request(server)
        .post('/api/solve')
        .send({
          "puzzle":"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        })
        .end(function(err, res){          
          res.should.have.status(200);
          res.should.be.json;          
          res.body.should.have.property('solution').eql("769235418851496372432178956174569283395842761628713549283657194516924837947381625");               
          done();
        })
    });
    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function(done) {
        chai.request(server)
        .post('/api/solve')
        .send({
          "puzzle":""  
        })
        .end(function(err, res){          
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql("Required field missing");      
          done();
        })
    });
    test('Solve a puzzle with invalid characters: POST request to /api/solve', function(done) {
        chai.request(server)
        .post('/api/solve')
        .send({
            "puzzle":",.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        })
        .end(function(err, res){          
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql("Invalid characters in puzzle");               
          done();
        })
    });
    test('Solve a puzzle with incorrect length: POST request to /api/solve', function(done) {
        chai.request(server)
        .post('/api/solve')
        .send({
            "puzzle":"...9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."      
        })
        .end(function(err, res){          
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql("Expected puzzle to be 81 characters long");      
          done();
        })
    });
    
    test('Solve a puzzle that cannot be solved: POST request to /api/solve', function(done) {
        chai.request(server)
        .post('/api/solve')
        .send({
            "puzzle":"5168497323.76.5...8.97...65135.6.9.7472591..696837..5.253186.746842.75..791.5.6.8"      
        })
        .end(function(err, res){          
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql("Puzzle cannot be solved");      
          done();
        })
    });
    
    test('Solve a puzzle with incorrect length', function(done) {
        chai.request(server)
        .post('/api/solve')
        .send({
            "puzzle":"...9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."      
        })
        .end(function(err, res){          
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql("Expected puzzle to be 81 characters long");      
          done();
        })
    });

    // api/check tests
    test('Check a puzzle placement with all fields: POST request to /api/check', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({
          "puzzle":"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          "coordinate":"A2",
          "value":"6"
        })
        .end(function(err, res){          
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('valid').eql(true);               
          done();
        })
    });
    test('Check a puzzle placement with single placement conflict: POST request to /api/check', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({
          "puzzle":"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          "coordinate":"A1",
          "value":"6"
        })
        .end(function(err, res){          
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('valid').eql(false);           
          res.body.should.have.property('conflict').eql(['column']);         
          done();
        })
    });
    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function(done) {
      chai.request(server)
      .post('/api/check')
      .send({
        "puzzle":"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        "coordinate":"A1",
        "value":"1"
      })
      .end(function(err, res){          
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('valid').eql(false);           
        res.body.should.have.property('conflict').eql(["row","column"]);         
        done();
      })
    });
    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function(done) {
      chai.request(server)
      .post('/api/check')
      .send({
        "puzzle":"..9..5.1.8514....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        "coordinate":"A1",
        "value":"1"
      })
      .end(function(err, res){          
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('valid').eql(false);           
        res.body.should.have.property('conflict').eql(["row","column","region"]);         
        done();
      })
    });        
    test('Check a puzzle placement with missing required fields: POST request to /api/check', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({
          "puzzle":"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          "coordinate":"A2",
          "value":""
        })
        .end(function(err, res){          
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Required field(s) missing');
          done();
        })
    });
    test('Check a puzzle placement with invalid characters: POST request to /api/check', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({
            "puzzle":"A.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
            "coordinate":"A2",
            "value":"6"
        })
        .end(function(err, res){          
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Invalid characters in puzzle');
          done();
        })
    });
    test('Check a puzzle placement with incorrect length: POST request to /api/check', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({
            "puzzle":".9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
            "coordinate":"A2",
            "value":"6"
        })
        .end(function(err, res){          
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Expected puzzle to be 81 characters long');
          done();
        })
    });
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
           done();
        })
    });
    test('Check a puzzle placement with invalid placement value: POST request to /api/check', function(done) {
        chai.request(server)
        .post('/api/check')
        .send({
            "puzzle":"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
            "coordinate":"A1",
            "value":"0"
        })
        .end(function(err, res){          
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
           done();
        })
    });
});
