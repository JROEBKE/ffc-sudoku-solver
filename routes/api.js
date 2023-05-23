'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

const { check, validationResult } = require('express-validator');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    
    .post(
      [      
        check('puzzle').trim().escape(),
        check('coordinate').trim().escape().toUpperCase(),
        check('value').trim().escape()
      ],
      (req, res) => {    

        const errors = validationResult(req);        
        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array()});                 
        }
        console.log(req.body);        
        
        let puzzle = req.body.puzzle;                  
        var coordinate = req.body.coordinate;
        // problem is here when coordinate undefined I cannot make a split here, but moving it to solver is bad as well, so I added an if here to set row and col to undefined as well, which then is validated
        if (coordinate==='' || coordinate===undefined){           
          var row = '';
          var column = '';          
        } else { 
          let coordinateArray = coordinate.split("") ;          
          var row = coordinateArray[0].toString();          
          var column = coordinateArray.slice(1).toString(); //slice row from array to still be able to validate if coordinate length higher 2
        }
        let value = req.body.value;

        let solution = new SudokuSolver(puzzle, row, column ,value);

        //I would rather use express validator here as well, but tutorial wants to use here explicit class for validation so we use it
        if (solution.validate()){
          res.status(400).json(solution.validate());        
        }
        
        if(solution.checkAll()){
          var result ={
            "valid": solution.checkAll(),  
          }        
        }
        else {
          let conflict =[];
          if (!solution.checkRowPlacement()){
            conflict.push('row');
          }
          if (!solution.checkColPlacement()){
            conflict.push('column');
          }
          if (!solution.checkRegionPlacement()){
            conflict.push('region');
          }
          var result ={
            "valid": solution.checkAll(),
            "conflict": conflict
          } 
        }
        res.status(200).json(result);    
      }
    );
    
  app.route('/api/solve')
    .post([      
      check('puzzle').trim().escape(),
    ],
    (req, res) => {
      let solution = new SudokuSolver(req.body.puzzle);
      if (solution.validate()){
        res.status(400).json(solution.validate());        
      }
      
      else {
        
        var result = solution.solve();
        if (!result){
          res.status(200).json({
            "error": "Puzzle cannot be solved"
          });
        } else {
          res.status(200).json({
            "solution": result
          });
        }
      }
    }
    );    
};
