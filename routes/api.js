'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

const { check, validationResult } = require('express-validator');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    
    .post(
      [      
        check('puzzle').trim().escape(),
        check('coordinate').notEmpty().trim().escape().isLength(2).matches(/[a-i][1-9]|[A-I][1-9]$/).withMessage('invalid coordinate'),
        check('value').notEmpty().trim().escape().isLength(1).matches(/[1-9]$/).withMessage('invalid value')
      ],
      (req, res) => {    

        const errors = validationResult(req);        
        if (!errors.isEmpty()) {
          //console.log(errors.array([0]));
          return res.status(400).send({ errors: errors.array()});
        }   

        let coordinateArray = req.body.coordinate.split("");
        let selectedRow = coordinateArray[0].toUpperCase();
        let selectedCol= coordinateArray[1];

        let solution = new SudokuSolver(req.body.puzzle,selectedRow, selectedCol, req.body.value);

        //I would rather use express validator here as well, but tutorial wants to use here explicit class for validation so we use it
        if (solution.validate()){
          res.status(400).json(solution.validate());        
        }

        var result ={
          "placementValid": solution.checkAll(),  
          "regionPlacement": solution.checkRegionPlacement(),
          "colPlacement": solution.checkColPlacement(),
          "rowPlacement": solution.checkRowPlacement()        
        }        
        res.status(200).json(result);    
      }
    );
    
  app.route('/api/solve')
    .post([      
      check('puzzle').trim().escape()
    ],
    (req, res) => {
      
      const errors = validationResult(req);        
        if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array()});
      }   

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
