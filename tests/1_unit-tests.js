const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('UnitTests', () => {
 
  // validation string tests
  it('Logic handles a valid puzzle string of 81 characters', function(){               
    let isValid = new Solver('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');         
    expect(isValid.validate()).to.be.false;
  });
  it('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(){
    let isInValid = new Solver('A.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');
    expect(isInValid.validate()).to.have.property('error').eql("Invalid characters in puzzle");   
  });
   it('Logic handles a puzzle string that is not 81 characters in length', function(){
    var isInValid = new Solver('29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');
    expect(isInValid.validate()).to.have.property('error').eql("Expected puzzle to be 81 characters long");   
  });
 
  //row placement tests
  it('Logic handles a valid row placement', function(){               
    let isValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','A','1','7');             
    expect(isValid.checkRowPlacement()).to.be.true;
  });
  it('Logic handles an invalid row placement', function(){               
    let isInValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','A','1','1');             
    expect(isInValid.checkRowPlacement()).to.be.false;
  });

  //column placement tests
  it('Logic handles a valid column placement', function(){               
    let isValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','A','1','7');             
    expect(isValid.checkColPlacement()).to.be.true;
  });
  it('Logic handles an invalid column placement', function(){               
    let isInValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','A','1','1');             
    expect(isInValid.checkColPlacement()).to.be.false;
  });

  //region placement tests
  it('Logic handles a valid region (3x3 grid) placement', function(){               
    let isValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','A','1','7');             
    expect(isValid.checkRegionPlacement()).to.be.true;
  });
  it('Logic handles an invalid region (3x3 grid) placement', function(){               
    let isInValid = new Solver('82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51','A','3','2');
    expect(isInValid.checkRegionPlacement()).to.be.false;
  });
  

  //solving tests  
  it('Valid puzzle strings pass the solver', function(){               
    let isValid = new Solver('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');             
    expect(isValid.solve()).to.equal('135762984946381257728459613694517832812936745357824196473298561581673429269145378');
  });

  it('Invalid puzzle strings fail the solver', function(){               
    let isInValid = new Solver('5168497323.76.5...8.97...65135.6.9.7472591..696837..5.253186.746842.75..791.5.6.8');             
    expect(isInValid.solve()).to.be.false;  
  });  
  
  it('Solver returns the the expected solution for an incomplete puzzzle', function(){               
    let isValid = new Solver('82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51');             
    expect(isValid.solve()).to.equal('827549163531672894649831527496157382218396475753284916962415738185763249374928651');
  });

});
