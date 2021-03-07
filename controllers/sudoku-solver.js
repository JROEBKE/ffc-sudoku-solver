class SudokuSolver {
  constructor(puzzleString, row, column, value) {
    this.puzzleString=puzzleString;
    this.row = row;
    this.column = column;
    this.value = value;




  }

  validate() {
    if (this.puzzleString.length!==81){
      console.log('string not 81 characters');
      return false;
    } 
    if (this.puzzleString.match(/^[\d .]+$/g)){
      //console.log('string nummeric + .');
      return true;
    }
    else {
      console.log('string not compliant');
      return false;
    }
  }

  checkRowPlacement() {
    let rows = ['A','B','C','D','E','F','G','H','I'];
    let startValue = rows.indexOf(this.row) * 9;
    let endValue = startValue + 9;
    let choppedString = this.puzzleString.slice(startValue,endValue);
    
    if (Array.from(choppedString).indexOf(this.value)=='-1'){
      //console.log('value not in row');
      return true;
    } else {
      //console.log('value already in row');
      return false;
    }
  }

  checkColPlacement() {
    let puzzleArray = Array.from(this.puzzleString);
    let newArray =[];    
    let startIndex = Number(this.column)-1;

    for (let i=0; i<9; i++){      
      newArray.push(puzzleArray[startIndex+i*9]);
    }

    if (newArray.indexOf(this.value)=='-1'){
      //console.log('value not in column');
      return true;
    } else {
      //console.log('value already in column');
      return false;
    }
  }

  checkRegionPlacement() {
    let puzzleArray = Array.from(this.puzzleString);
    let rows = ['A','B','C','D','E','F','G','H','I'];
    let newArray=[];    
    
    const box1 =['0','1','2','9','10','11','18','19','20'];
    const box2 =['3','4','5','12','13','14','21','22','23'];
    const box3 =['6','7','8','15','16','17','24','25','26'];
    const box4 =['27','28','29','36','37','38','45','46','47'];
    const box5 =['30','31','32','39','40','41','48','49','50'];
    const box6 =['33','34','35','42','43','44','51','52','53'];
    const box7 =['54','55','56','63','64','65','72','73','74'];
    const box8 =['57','58','59','66','67','68','75','76','77'];
    const box9 =['60','61','62','69','70','71','78','79','80'];

    let indexNum = rows.indexOf(this.row) * 9 + Number(this.column)-1;
    if (box1.includes(indexNum.toString())){
      for (let i=0; i<9; i++){
        newArray.push(puzzleArray[Number(box1[i])]);       
      }
    }
    else if (box2.includes(indexNum.toString())){
      for (let i=0; i<9; i++){
        newArray.push(puzzleArray[Number(box2[i])]);       
      }
    }
    else if (box3.includes(indexNum.toString())){
      for (let i=0; i<9; i++){
        newArray.push(puzzleArray[Number(box3[i])]);       
      }
    }
    else if (box4.includes(indexNum.toString())){
      for (let i=0; i<9; i++){
        newArray.push(puzzleArray[Number(box4[i])]);       
      }
    }
    else if (box5.includes(indexNum.toString())){
      for (let i=0; i<9; i++){
        newArray.push(puzzleArray[Number(box5[i])]);       
      }
    }
    else if (box6.includes(indexNum.toString())){
      for (let i=0; i<9; i++){
        newArray.push(puzzleArray[Number(box6[i])]);       
      }
    }
    else if (box7.includes(indexNum.toString())){
      for (let i=0; i<9; i++){
        newArray.push(puzzleArray[Number(box7[i])]);       
      }
    }
    else if (box8.includes(indexNum.toString())){
      for (let i=0; i<9; i++){
        newArray.push(puzzleArray[Number(box8[i])]);       
      }
    }
    else if (box9.includes(indexNum.toString())){
      for (let i=0; i<9; i++){
        newArray.push(puzzleArray[Number(box9[i])]);       
      }
    } else {
      console.log('something went wrong numIndex is not part of boxes');
      return false;
    }

    
    if (newArray.indexOf(this.value)=='-1'){
      //console.log('value not in region');
      return true;
    } else {
      //console.log('value already in region');
      return false;
    }
  }

  checkAll() {
    if (this.validate() && this.checkRowPlacement() && this.checkColPlacement() && this.checkRegionPlacement()){
      //console.log('input '+this.row+this.column+' '+this.value+' correct with string'+this.puzzleString);
      return true;
    } else {
      //console.log('provided string is invalid');
      return false;
    };         
  }
 

  solve() {
    var arr = [1,2,3,4,5,6,7,8,9];
    var arrayStorage=[];
    var resultArray = Array.from(this.puzzleString);
    const regionIndexArray = [['0','1','2','9','10','11','18','19','20'],['3','4','5','12','13','14','21','22','23'],['6','7','8','15','16','17','24','25','26'],['27','28','29','36','37','38','45','46','47'],['30','31','32','39','40','41','48','49','50'],['33','34','35','42','43','44','51','52','53'],['54','55','56','63','64','65','72','73','74'],['57','58','59','66','67','68','75','76','77'],['60','61','62','69','70','71','78','79','80']];
    
    //Simple solving function approach by checking for each region i if single entry is missing
    function simpleSolveRegion(){   
      for (let i=0; i<9; i++){
        let regionUndefinedIndex = 0;
        let countUndefined =0;
        let regionUsedValues=[];
        
        for (let j=0; j<9; j++){              
          if (isNaN(resultArray[regionIndexArray[i][j]])){
            countUndefined++;
            regionUndefinedIndex=j;
          } else {
            regionUsedValues.push(resultArray[regionIndexArray[i][j]]);            
          }     
        }
        if (countUndefined===1){
          for (let k=0; k<9; k++){
            let regionUsedValuesSorted = regionUsedValues.sort();
            let arrSorted = arr.sort();
            
            if (regionUsedValuesSorted[k]>arrSorted[k]){
              //console.log('we add '+arr[k]+' because '+regionUsedValuesSorted[k]+' > '+arr[k]);                                         
              resultArray[regionIndexArray[i][regionUndefinedIndex]] = arrSorted[k];              
              break;
            }
          }          
        }
      }
    }    
   
    //Simple solving function approach by checking for each column i if single entry is missing
    function simpleSolveCol(){   
      for (let i=0; i<9; i++){
        let countUndefined =0;        
        let startIndex = i*9;
        let endIndex = startIndex+9;
        let arrSorted = arr.sort();
        let colUsedValues=resultArray.slice(startIndex,endIndex);
        let colUndefinedIndex;

        //console.log(colUsedValues);
        for (let j=0; j<9;j++) {
          if(isNaN(colUsedValues[j])){
            countUndefined++;
            colUndefinedIndex=j;
          };
        }
        if (countUndefined===1){
          //console.log('we have a simple col');
          for (let k=0; k<9; k++){
            let colUsedValuesSorted = colUsedValues.sort().slice(1);
            if (colUsedValuesSorted[k]>arrSorted[k]){
              //console.log('we add '+arrSorted[k]+' because '+colUsedValuesSorted[k]+' > '+arrSorted[k]);
              let replaceIndex = startIndex + colUndefinedIndex;
              //console.log('we replace index '+replaceIndex);
              resultArray[replaceIndex] = arrSorted[k];              
              break;
            }
          }          
        }
      }

    }

    //Simple solving function approach by checking for each row i if single entry is missing
    function simpleSolveRow(){   
      let arrSorted = arr.sort();
      for (let i=0; i<1; i++){   
        let countUndefined =0;        
        let rowUsedValues=[];
        let rowUndefinedIndex;
      
        for (let j=0; j<9;j++) {
          //console.log('value used in row '+resultArray[i+j*9]);
          rowUsedValues.push(resultArray[i+j*9]);
          //console.log(rowUsedValues);
          if(isNaN(rowUsedValues[j])){
            countUndefined++;
            rowUndefinedIndex=j;
          };
        }
        if (countUndefined===1){
          //console.log('we have a simple row');
          for (let k=0; k<9; k++){
            let rowUsedValuesSorted = rowUsedValues.sort().slice(1);
            if (rowUsedValuesSorted[k]>arrSorted[k]){
              //console.log('we add '+arrSorted[k]+' because '+rowUsedValuesSorted[k]+' > '+arrSorted[k]);
              let replaceIndex =rowUndefinedIndex+i*9;
              //console.log('we replace index '+replaceIndex);
              resultArray[replaceIndex] = arrSorted[k];              
              break;
            }
          }          
        }
      }

    }
    
    //Brute force solution
    function tryToSolve(orderArray){
      shuffleArray(arr); 
      arrayStorage.push(arr.join(""))   
      for (let i=0; i<81; i++){      
        for (let j=0; j<9; j++){          
          let rows = ['A','B','C','D','E','F','G','H','I']; 
          let newRowNum = Math.trunc(i/9);
          let newRow = rows[newRowNum]; 
          let newCol = i-newRowNum*9+1;
          var count = 0;
          if (isNaN(resultArray[i])){   
            let newValue = orderArray[j].toString();                    
            let result = new SudokuSolver(resultArray.join(""),newRow,newCol,newValue);       
            //console.log(result.checkAll()+' for '+newValue+' for coord '+newRow+newCol);
            if (result.checkAll()){          
              resultArray[i]=orderArray[j];            
              count++;
            } 
          }       
        }
        //here I must add a break if no number has been added it means '.' could not be substituted and therefore we restart
        if(count=0){
          console.log('break if no replacement took place works !');
          break;
        }
      }
    }  
    //Helper function for randomizing numbers as start values for iteration
    function shuffleArray(arr) {           
      while (arrayStorage.includes(arr.join(""))) {        
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];          
        }         
      }    
    }
    
    while (resultArray.includes('.')) {
      resultArray = Array.from(this.puzzleString);
      simpleSolveRegion();
      simpleSolveCol();
      simpleSolveRow();         
      tryToSolve(arr);      
    }   
    //console.log(arrayStorage);
    var resultString = resultArray.join("");
    console.log('random tries '+arrayStorage.length);
    
    console.log(resultString);
    return resultString;    
  }
}

module.exports = SudokuSolver;

