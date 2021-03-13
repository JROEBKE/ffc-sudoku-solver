'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

const { check, validationResult } = require('express-validator');

// catch handler
const awaitHandlerFactory = (middleware) => {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    // need to include input validation !!!
    .post((req, res) => {
      let coordinateArray = req.body.coordinate.split("");
      let selectedRow = coordinateArray[0]; 
      let selectedCol= coordinateArray[1];
      let solution = new SudokuSolver(req.body.puzzle,selectedRow, selectedCol, req.body.value);
      var result ={
        "placementValid": solution.checkAll(),  
        "regionPlacement": solution.checkRegionPlacement(),
        "colPlacement": solution.checkColPlacement(),
        "rowPlacement": solution.checkRowPlacement()        
      }        
    res.status(200).json(result);    
    });
    
  app.route('/api/solve')
    .post((req, res) => {

      let solution = new SudokuSolver(req.body.puzzle);

      if (solution.validate()){
        console.log();
        res.status(200).json(solution.validate());        
      }
      else {
        console.log('validation true');
        var result ={
            "solution": solution.solve()
        }        
        res.status(200).json(result);    
      }
    });    
};
