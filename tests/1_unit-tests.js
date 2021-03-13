const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('UnitTests', () => {
  
  // validation string tests
  it('returns false if valid input of 81', function(){               
    let isValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');             
    expect(isValid.validate()).to.be.false;
  });
  
  it('returns true if invalid input alphanumeric instead numeric + .', function(){
    let isInValid = new Solver('A29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');
    expect(isInValid.validateCharacters()).to.be.false;
  });
   it('returns true if input <81 characters', function(){
    var isInValid = new Solver('29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');
    expect(isInValid.validateLength()).to.be.false;
  });
  it('returns true if input >81 characters', function(){
    var isInValid = new Solver('1129..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');
    expect(isInValid.validateLength()).to.be.false;
  });

  //row placement tests
  it('returns true by correct placement', function(){               
    let isValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','A','1','7');             
    expect(isValid.checkRowPlacement()).to.be.true;
  });
  it('returns true by correct placement with different coordinates', function(){               
    let isValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','E','3','7');             
    expect(isValid.checkRowPlacement()).to.be.true;
  });
  it('returns true row validation works for invalid value', function(){               
    let isInValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','A','1','1');             
    expect(isInValid.checkRowPlacement()).to.be.false;
  });

  //column placement tests
  it('returns true by correct value placement to column', function(){               
    let isValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','A','1','7');             
    expect(isValid.checkColPlacement()).to.be.true;
  });
  it('returns true by correct placement to column with different coordinates', function(){               
    let isValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','E','3','7');             
    expect(isValid.checkColPlacement()).to.be.true;
  });
  it('returns true by correct placement to column with different coordinates-2', function(){               
    let isValid = new Solver('1357.2.84..63.1257.27.5.9..69571.8..81253674.3.7.2..9.475928..13.165784926914.37.','A','5','6');             
    expect(isValid.checkColPlacement()).to.be.true;
  });
  it('returns true column validation works for invalid value', function(){               
    let isInValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','A','1','1');             
    expect(isInValid.checkColPlacement()).to.be.false;
  });

  //region placement tests
  it('returns true by correct value placement to region', function(){               
    let isValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','A','1','7');             
    expect(isValid.checkRegionPlacement()).to.be.true;
  });
  it('returns true by correct placement to region with different coordinates', function(){               
    let isValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','E','3','7');             
    expect(isValid.checkRegionPlacement()).to.be.true;
  });
  it('returns true region validation works for invalid value-1', function(){               
    let isInValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','A','1','9');             
    expect(isInValid.checkRegionPlacement()).to.be.false;
  });
  it('returns true region validation works for invalid value-2', function(){               
    let isInValid = new Solver('82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51','A','3','2');
    expect(isInValid.checkRegionPlacement()).to.be.false;
  });
  
  //check all tests  
  
  it('returns true by allowed value overall', function(){               
    let isValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','A','1','7');             
    expect(isValid.checkAll()).to.be.true;
  });
  it('returns true by allowed value overall with different coordinates', function(){               
    let isValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','E','3','7');             
    expect(isValid.checkAll()).to.be.true;
  });
  it('returns true if one check fails- 1', function(){               
    let isInValid = new Solver('.29..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..','A','1','2');             
    expect(isInValid.checkAll()).to.be.false;
  });
  it('returns true if one check fails-2 ', function(){               
    let isInValid = new Solver('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.','A','2','1');             
    expect(isInValid.checkAll()).to.be.false;
  });
  it('returns true if one check fails-3', function(){               
    let isInValid = new Solver('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3','B','4','1');             
    expect(isInValid.checkAll()).to.be.false;
  });
  

  //solving tests
  
  it('returns solved string for puzzled string with simple example for region', function(){               
    let isValid = new Solver('.35762984946381257728459613694517832812936745357824196473298561581673429269145378');             
    expect(isValid.solve()).to.equal('135762984946381257728459613694517832812936745357824196473298561581673429269145378');
  });
  /*
  it('returns solved string for puzzled string with simple example for column', function(){               
    let isValid = new Solver('.35762984.46381257728459613694517832812936745357824196473298561581673429269145378');             
    expect(isValid.solve()).to.equal('135762984946381257728459613694517832812936745357824196473298561581673429269145378');
  });
  
  it('returns solved string for puzzled string with simple example for row', function(){               
    let isValid = new Solver('..5762984946381257728459613694517832812936745357824196473298561581673429269145378');             
    expect(isValid.solve()).to.equal('135762984946381257728459613694517832812936745357824196473298561581673429269145378');
  });
  
  it('returns solved string for puzzled string-1', function(){               
    let isValid = new Solver('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');             
    expect(isValid.solve()).to.equal('135762984946381257728459613694517832812936745357824196473298561581673429269145378');
  });
  
  it('returns solved string for puzzled string-2', function(){               
    let isValid = new Solver('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3');             
    expect(isValid  ).to.equal('568913724342687519197254386685479231219538467734162895926345178473891652851726943');
  });  
    
  it('returns solved string for puzzled string-3', function(){               
    let isValid = new Solver('.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6');             
    expect(isValid.solve()).to.equal('473891265851726394926345817568913472342687951197254638734162589685479123219538746');
  });
  /*  
  // needs still long time  
  it('returns solved string for puzzled string-4', function(){               
    let isValid = new Solver('82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51');             
    expect(isValid.solve()).to.equal('827549163531672894649831527496157382218396475753284916962415738185763249374928651');
  });*/
});
