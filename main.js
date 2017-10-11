 console.log('main.js is running');
// ------------------------- objects -------------------------
/*   tile constructor
  *    className: 'unplayed' // className for correct color
  *    occupied: false
  *    $DOMlocation: null;
  *    row: position in board
  *    column: position in board
*/
function Tile ($DOM, row, column) {
  this.occupied = false;
  this.$DOMobj = $DOM;

  // FIXME may need to delete row and column if unused
  this.row = row;
  this.column = column;
}

/*   gameBlocks constructor
  *    an array holding tiles
*/


// Coordinate saves the position of tiles that are used for gameBlocks
function Coordinate(row, column) {
  this.row = row;
  this.column = column;
}

// Square constructor, will modify gameState.board for init and moves
function Square() {
  this.className = 'square';
  //tiles could be 2d, but 1d for generalization of adding block to board
  this.tiles = [];
  // set tiles to beginning of board
  for(let i = 0; i < 2; i++) {
    for(let j = 0; j < 2; j++) {
      //add 4 to j to start in middle of board
      let tile = new Coordinate(i, j + 4);
      this.tiles.push(tile);
    }
  }
}

// Square methods
//returns false if next block cannot be moved down
Square.prototype.checkDown = function() {
  //check to see if reached bottom row or next tile is filled
  for(let i = 2; i < 4; i++) {
    if(this.tiles[i].row == 19 ||
      gameState.boardArray[this.tiles[i].row + 1][this.tiles[i].column].occupied){
      return false;
    }
  }
  return true;
}

Square.prototype.moveDown = function() {
  if(this.checkDown()) {
    for(let i = 0; i < 2; i++) {
    //change top two blocks to unplayed class and increment tracker
    gameState.boardArray[this.tiles[i].row][this.tiles[i].column].$DOMobj.classList.replace(`${this.className}`, 'unplayed');
    this.tiles[i].row += 1;
    }
    for(let i = 2; i < 4; i++) {
      this.tiles[i].row += 1;
      gameState.boardArray[this.tiles[i].row][this.tiles[i].column].$DOMobj.classList.replace('unplayed', `${this.className}`);
    }
  }
}

Square.prototype.checkRight = function() {
  //check to see if reached right border or next tile is filled
  //(checks top right and bottom right tiles)
  for(let i = 1; i < 4; i+=2) {
    if(this.tiles[i].column == 9 ||
      gameState.boardArray[this.tiles[i].row][this.tiles[i].column + 1].occupied){
      return false;
    }
  }
  return true;
}

Square.prototype.moveRight = function() {
  if(this.checkRight()) {
    for(let i = 0; i < 4; i+=2) {
    //change left two blocks to unplayed class and increment tracker
    gameState.boardArray[this.tiles[i].row][this.tiles[i].column].$DOMobj.classList.replace(`${this.className}`, 'unplayed');
    this.tiles[i].column += 1;
    }
    for(let i = 1; i < 4; i+=2) {
      this.tiles[i].column += 1;
      gameState.boardArray[this.tiles[i].row][this.tiles[i].column].$DOMobj.classList.replace('unplayed', `${this.className}`);
    }
  }
}

Square.prototype.checkLeft = function() {
  //check to see if reached left border or next tile is filled
  //(checks top right and bottom right tiles)
  for(let i = 0; i < 4; i+=2) {
    if(this.tiles[i].column == 0 ||
      gameState.boardArray[this.tiles[i].row][this.tiles[i].column - 1].occupied){
      return false;
    }
  }
  return true;
}

Square.prototype.moveLeft = function() {
  if(this.checkLeft()) {
    for(let i = 1; i < 4; i+=2) {
    //change right two blocks to unplayed class and increment tracker
    gameState.boardArray[this.tiles[i].row][this.tiles[i].column].$DOMobj.classList.replace(`${this.className}`, 'unplayed');
    this.tiles[i].column -= 1;
    }
    for(let i = 0; i < 4; i+=2) {
      this.tiles[i].column -= 1;
      gameState.boardArray[this.tiles[i].row][this.tiles[i].column].$DOMobj.classList.replace('unplayed', `${this.className}`);
    }
  }
}

function Cross() {
  this.className = 'cross';
  //set tiles to up position with first tile as origin (center)
  this.tiles = [
    (new Coordinate(1,5)),
    (new Coordinate(1,4)),
    (new Coordinate(0,5)),
    (new Coordinate(1,6))
  ];
  this.orientation = 'up';

  //rotation coordinates to be added to origin at tiles[0]
  this.up = [new Coordinate(0,-1), new Coordinate(-1,0), new Coordinate(0,1)];
  this.right = [new Coordinate(-1,0), new Coordinate(0,1), new Coordinate(1,0)];
  this.down = [new Coordinate(0,-1), new Coordinate(1,0), new Coordinate(0,1)];
  this.left = [new Coordinate(-1,0), new Coordinate(0,-1), new Coordinate(1,0)];
}

Cross.prototype.checkDown = function() {
  //check below each tile to see if it can move down
  for(coord of this.tiles) {
    if(coord.row == 19 ||
      gameState.boardArray[coord.row + 1][coord.column].occupied) {
      return false;
    }
  }
  return true;
}

Cross.prototype.moveDown = function() {
  if(this.checkDown()) {
    for(coord of this.tiles) {
      gameState.boardArray[coord.row][coord.column].$DOMobj.classList.replace(`${this.className}`, 'unplayed');
    }
    for(coord of this.tiles) {
      coord.row += 1;
      gameState.boardArray[coord.row][coord.column].$DOMobj.classList.replace('unplayed', `${this.className}`);
    }
  }
}

Cross.prototype.checkRight = function() {
  //check to the right of each tile to see if it can move right
  for(coord of this.tiles) {
    if(coord.column == 9 ||
      gameState.boardArray[coord.row][coord.column + 1].occupied) {
      return false;
    }
  }
  return true;
}

Cross.prototype.moveRight = function() {
  if(this.checkRight()) {
    for(coord of this.tiles) {
      gameState.boardArray[coord.row][coord.column].$DOMobj.classList.replace(`${this.className}`, 'unplayed');
    }
    for(coord of this.tiles) {
      coord.column += 1;
      gameState.boardArray[coord.row][coord.column].$DOMobj.classList.replace('unplayed', `${this.className}`);
    }
  }
}

Cross.prototype.checkLeft = function() {
  //check to the left of each tile to see if it can move left
  for(coord of this.tiles) {
    if(coord.column == 0 ||
      gameState.boardArray[coord.row][coord.column - 1].occupied) {
      return false;
    }
  }
  return true;
}

Cross.prototype.moveLeft = function() {
  if(this.checkLeft()) {
    for(coord of this.tiles) {
      gameState.boardArray[coord.row][coord.column].$DOMobj.classList.replace(`${this.className}`, 'unplayed');
    }
    for(coord of this.tiles) {
      coord.column -= 1;
      gameState.boardArray[coord.row][coord.column].$DOMobj.classList.replace('unplayed', `${this.className}`);
    }
  }
}

Cross.prototype.rotate = function(direction) {
  let testCoords = [];
  let testOrientation = '';
  testCoords.push(this.tiles[0]); //sets origin for testCoords array
  switch (this.orientation) {
    case 'up':
      // direction == clockwise then 'right' else 'left'
      (direction == 'right') ? testOrientation = 'right' : testOrientation = 'left';
      break;
    case 'right':
      // direction == clockwise then 'down' else 'up'
      (direction == 'right') ? testOrientation = 'down' : testOrientation = 'up';
      break;
    case 'down':
      // direction == clockwise then 'left' else 'right'
      (direction == 'right') ? testOrientation = 'left' : testOrientation = 'right';
      break;
    case 'left':
      // direction == clockwise then 'up' else 'down'
      (direction == 'right') ? testOrientation = 'up' : testOrientation = 'down';
      break;
    default:
      console.log(`Error rotating ${this.className} ${direction}`);
  }

  //apply object matching the testOrientation string to origin from this.tiles[0]
  // ... pushing result into testCoords
  for(let i = 0; i < this[`${testOrientation}`].length; i++) {
    let testRow = testCoords[0].row + this[`${testOrientation}`][i].row;
    let testCol = testCoords[0].column + this[`${testOrientation}`][i].column;
    testCoords.push(new Coordinate(testRow, testCol));
  }

  //then check testCoords to see if they are valid positions
  let valid = true;
  for(coord of testCoords) {
    if(gameState.boardArray[coord.row][coord.column].occupied) {
      valid = false;
    }
  }

  if(valid) {
    // ... if valid still true, change current positions to unplayed class
    for(coord of this.tiles) {
      gameState.boardArray[coord.row][coord.column].$DOMobj.classList.replace(`${this.className}`, 'unplayed');
    }

    // ... then change this.tiles to testCoords and change current positions to this.classname
    this.tiles = testCoords;
    for(coord of this.tiles) {
      gameState.boardArray[coord.row][coord.column].$DOMobj.classList.replace('unplayed', `${this.className}`);
    }

    // ... finally change the orientation to testOrientation
    this.orientation = testOrientation; //symbolic representation
  } else {
    console.log(`${this.className} could not rotate ${direction}`);
  }
}

// gameCreate();
// let cross = new Cross();
// gameState.addBlockToBoard(cross);

function StepRt() {
  this.className = 'stepRt';
  //set tiles to up position with first tile as origin (center)
  this.tiles = [
    (new Coordinate(1,4)),
    (new Coordinate(1,3)),
    (new Coordinate(0,4)),
    (new Coordinate(0,5))
  ];
  this.orientation = 'right';

  //rotation coordinates to be added to origin at tiles[0]
  this.right = [new Coordinate(0,-1), new Coordinate(-1,0), new Coordinate(-1,1)];
  this.down = [new Coordinate(-1,0), new Coordinate(0,1), new Coordinate(1,1)];
  this.left = [new Coordinate(0,1), new Coordinate(1,0), new Coordinate(1,-1)];
  this.up = [new Coordinate(1,0), new Coordinate(0,-1), new Coordinate(-1,-1)];
}

StepRt.prototype = Object.create(Cross.prototype);
StepRt.prototype.constructor = StepRt;

function StepLt() {
  this.className = 'stepLt';
  //set tiles to up position with first tile as origin (center)
  this.tiles = [
    (new Coordinate(1,4)),
    (new Coordinate(0,4)),
    (new Coordinate(0,3)),
    (new Coordinate(1,5))
  ];
  this.orientation = 'left';

  //rotation coordinates to be added to origin at tiles[0]
  this.left = [new Coordinate(0,1), new Coordinate(-1,0), new Coordinate(-1,-1)];
  this.up = [new Coordinate(1,0), new Coordinate(0,1), new Coordinate(-1,1)];
  this.right = [new Coordinate(0,-1), new Coordinate(1,0), new Coordinate(1,1)];
  this.down = [new Coordinate(-1,0), new Coordinate(0,-1), new Coordinate(1,-1)];
}

// FIXME may need to change up down left right of steps to only have up down

StepLt.prototype = Object.create(Cross.prototype);
StepLt.prototype.constructor = StepLt;

function LBlock() {
  this.className = 'lBlock';
  //set tiles to up position with first tile as origin (center)
  this.tiles = [
    (new Coordinate(1,5)),
    (new Coordinate(1,4)),
    (new Coordinate(1,3)),
    (new Coordinate(0,5))
  ];
  this.orientation = 'left';

  //rotation coordinates to be added to origin at tiles[0]
  this.left = [new Coordinate(-1,0), new Coordinate(0,-1), new Coordinate(0,-2)];
  this.up = [new Coordinate(0,1), new Coordinate(-1,0), new Coordinate(-2,0)];
  this.right = [new Coordinate(1,0), new Coordinate(0,1), new Coordinate(0,2)];
  this.down = [new Coordinate(0,-1), new Coordinate(1,0), new Coordinate(2,0)];
}

LBlock.prototype = Object.create(Cross.prototype);
LBlock.prototype.constructor = LBlock;

function JBlock() {
  this.className = 'jBlock';
  //set tiles to up position with first tile as origin (center)
  this.tiles = [
    (new Coordinate(1,3)),
    (new Coordinate(1,4)),
    (new Coordinate(1,5)),
    (new Coordinate(0,3))
  ];
  this.orientation = 'right';

  //rotation coordinates to be added to origin at tiles[0]
  this.right = [new Coordinate(-1,0), new Coordinate(0,1), new Coordinate(0,2)];
  this.down = [new Coordinate(0,1), new Coordinate(1,0), new Coordinate(2,0)];
  this.left = [new Coordinate(1,0), new Coordinate(0,-1), new Coordinate(0,-2)];
  this.up = [new Coordinate(0,-1), new Coordinate(-1,0), new Coordinate(-2,0)];
}

JBlock.prototype = Object.create(Cross.prototype);
JBlock.prototype.constructor = JBlock;


function Line() {
  this.className = 'line';
  //set tiles to up position with first tile as origin (center)
  this.tiles = [
    (new Coordinate(0,3)),
    (new Coordinate(0,4)),
    (new Coordinate(0,5)),
    (new Coordinate(0,6))
  ];
  this.orientation = 'right';

  //rotation coordinates to be added to origin at tiles[0]
  this.right = [new Coordinate(0,1), new Coordinate(0,2), new Coordinate(0,3)];
  this.down = [new Coordinate(1,0), new Coordinate(2,0), new Coordinate(3,0)];
  this.left = [new Coordinate(0,-1), new Coordinate(0,-2), new Coordinate(0,-3)];
  this.up = [new Coordinate(-1,0), new Coordinate(-2,0), new Coordinate(-3,0)];
}

Line.prototype = Object.create(Cross.prototype);
Line.prototype.constructor = Line;

const gameState = {
 // ------------------------- properties -------------------------

 /** boardArray[rows][columns] == [20 tiles][10 tiles]
  *  made up of tiles {className, occupied, $DOMobj, row, column}
  */
  boardArray: [], //array of tiles that make up game board
  blockArray: [], //array of blocks to be added to gameBoard
  currentLevel: 1, //increases when linesCleared % 10 == 0
  linesCleared: 0, //increases if told to by checkClear
  inProgress: true,

 /**
 * blockArray: [],
 *     an array made of all the gameBlocks for that level
 *
 * // may not need currentBlock -> may contain currentBlock in blockMove
 * currentBlock = null;
 *    holds the current block that's being moved in the board
 */

 // ------------------------- methods -------------------------

 // return 2d array with numRows of rows of tiles
  createRows: function(numRows) {
    let finalArr = [];
    for(let i = 0; i < numRows; i++) {
      let row = [];
      for(let j = 0; j < 10; j++) {
        const tile = new Tile(document.createElement('div'), i, j);
        tile.$DOMobj.className = 'tile unplayed';
        row.push(tile);
        // FIXME if we are not adding children here then how do we do so later?
        //document.getElementById('board').appendChild(tile.$DOMobj);
      }
      finalArr.push(row);
    }
    return finalArr;
  },

 // create gameBoard
  createBoard: function() {
    const numRows = 20;
    const numColumns = 10;
    this.boardArray = this.createRows(numRows);
    console.log(this.boardArray);
    const $board = document.getElementById('board');
    for(let i = 0; i < numRows; i++) {
      for(let j = 0; j < numColumns; j++) {
        $board.appendChild(this.boardArray[i][j].$DOMobj);
      }
    }
  },

 // create blockArray with numBlocks size and random assortment of blocks
  createBlocks: function(numBlocks) {
    //create blocks. call with 4 on level create
    for(let i = 0; i < numBlocks; i++) {
      //switch based on random number between 0 and 6
      let block;
      switch (Math.floor(Math.random() * 7)) {
        case 0:
          //create Square
          console.log('make square');
          block = new Square();
          break;
        case 1:
          //create Cross
          console.log('make cross');
          block = new Cross();
          break;
        case 2:
          //create StepRight
          console.log('make StepRt');
          block = new StepRt();
          break;
        case 3:
          //create StepLeft
          console.log('make StepLt');
          block = new StepLt();
          break;
        case 4:
          //create LBlock
          console.log('make LBlock');
          block = new LBlock();
          break;
        case 5:
          //create JBlock
          console.log('make JBlock');
          block = new JBlock();
          break;
        case 6:
          //create Line
          console.log('make Line');
          block = new Line();
          break;
        default:
          console.log('Random number error in createBlocks.')
      }
      this.blockArray.push(block);
    }
  },

 // pass in a block to add to boardArray
  addBlockToBoard: function(block) {
    for(let i = 0; i < block.tiles.length; i++) {
      //address to change color via boardArray
      const colorRow = block.tiles[i].row;
      const colorColumn = block.tiles[i].column;
      this.boardArray[colorRow][colorColumn].$DOMobj.classList.replace('unplayed', `${block.className}`);
    }
  },

 // set block into position, for end of move
 // returns true if valid entry, false if cannot enter
  setBlockInBoard: function(block) {
    // FIXME may need to change this if we change object tiles to 2d array
    for(let i = 0; i < block.tiles.length; i++) {
      let boardRow = block.tiles[i].row;
      let boardCol = block.tiles[i].column;
      if(this.boardArray[boardRow][boardCol].occupied) {return false;}
      else {this.boardArray[boardRow][boardCol].occupied = true;}
    }
    console.log('block commited to board');
    return true;
  },

  //returns number of rows cleared to add to player's tally
  clearRows: function() {
    //loop through rows from bottom to top
    let firstClear = -1;
    let numClears = 0;
    let rowClear = true;

    //first check to see if any rows are full
    let row = 0;
    while(row < 20) {
      rowClear = true;
      let column = 0;
      //if reaches an unoccopied tile, goes to next row
      while(rowClear && column < 10) {
        rowClear = this.boardArray[row][column].occupied;
        ++column;
      }
      if(rowClear) {
        if(numClears == 0) {
          firstClear = row;
        }
        ++numClears;
      }
      row++;
    }
    console.log(`found ${numClears} full rows starting at row ${firstClear}`);
    // if there were any cleared rows, must update this.tileArray and DOM
    const $board = document.getElementById('board');
    if(numClears > 0) {
      //take out full rows and delete them from the DOM
      let deletedRows = this.boardArray.splice(firstClear, numClears);
      for(let i = 0; i < numClears; i++) {
        for(let j = 0; j < 10; j++) {
          $board.removeChild(deletedRows[i][j].$DOMobj);
        }
      }

      let $before = document.getElementsByClassName('tile')[0];
      for(let i = numClears-1; i >= 0; i--) {
        this.boardArray.unshift([]);
        let $before = document.getElementsByClassName('tile')[0];
        for(let j = 0; j < 10; j++) {
          const tile = new Tile(document.createElement('div'), i, j);
          tile.$DOMobj.className = 'tile unplayed';
          this.boardArray[0].push(tile)
        }
      }
      for(let i = 0; i < numClears; i++) {
        for(let j=0; j < 10; j++) {
          $board.insertBefore(this.boardArray[i][j].$DOMobj, $before);
        }
      }
    }

    return numClears;
  },

  runGame: function() {
    //create 4 blocks, 1 to be added and 3 for upcoming blocks
    let endGame = false;

    this.createBlocks(4);

    let currentBlock = this.blockArray.shift();
    this.addBlockToBoard(currentBlock);

    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowRight':
          currentBlock.moveRight();
          break;
        case 'ArrowLeft':
          currentBlock.moveLeft();
          break;
        case 'ArrowDown':
          currentBlock.moveDown();
          break;
        case 'm':
        //rotate right
          currentBlock.rotate('right');
          break;
        case 'n':
        //rotate left
          currentBlock.rotate('left');
          break;
        case ' ':
        //store block in queue
          break;
      }
    });

    // FIXME update upcoming block viewer

    //apply moveDown every amount of milliseconds
    let intervalN = window.setInterval(() => {
      if(currentBlock.checkDown()) {
        currentBlock.moveDown();
        console.log('the blocks are falling!');
      } else {
        console.log('Block finished');

        //set current block in board
        console.log('Check for end by setting in board');
        endGame = !(this.setBlockInBoard(currentBlock));
        console.log(`end game is ${endGame}`);

        if(endGame) {
          console.log('ur game is over, fool');
          window.clearInterval(intervalN);
          console.log('moveDown on interval has stopped');
        } else {
          console.log('create new block.');
          //update current block to front of blocksArray
          currentBlock = this.blockArray.shift();
          //add block to blocksArray
          this.createBlocks(1);

          //check for rows cleared
          this.linesCleared += this.clearRows();
          if(this.linesCleared % 10 == 0) {
            this.currentLevel += 1;
            console.log(`current level has increased to ${this.currentLevel}`)
          }

          this.addBlockToBoard(currentBlock);
        }
      }
    }, 1500 / this.currentLevel);

  },
    // while(this.inProgress) {
    //   //send first block to board
    //   let currentBlock = this.blockArray.shift();
    //   this.addBlockToBoard(currentBlock);

    //   //add new block to blockArray
    //   this.createBlocks(1);
    //   // FIXME update upcoming block viewer

    //   //apply moveDown every amount of milliseconds
    //   window.setInterval(() => {
    //     currentBlock.moveDown();
    //   }, 1 / this.currentLevel);

    //   //failsafe return for now
    //   return true;
    //   //when block can't moveDown anymore, commit it to board and
    // }

/**
 * level create function
 *    make all of the gameBlocks using a random selector and array
 *
 * block move function
 *   use window.setInterval
 *   may need different one for each type of block
 *   0. check if bottom blocks can move
 *        -- if reaches bottom of board or next blocks are occupied
 *        -- then execute endMove function
 *   1. make blocks white and change to unoccupied in array
 *   2. increment row for each of the blocks? or just change the ones that need to be changed
 *   3. set new spots to be the correct color
 *
 * endMove function
 *    check if loss condition (block cannot fit on board)
 *    check if rows filled
 *        if rows are filled then clear in boardArray, and move down all other rows
 *        update DOM
 *    may return a number of rowscleared
 *
 *
 */
}

// ------------------------- functions -------------------------



// game logic
/*
gameCreate() triggered by start button on index.html
  levelCreate(currentLevel)
  --currentLevel = 1;
  --create blocks for level
      while(!endMove){ blockMove }
      if no loss, then go back to level create with increased level count
*/

/**
 * This function creates the board and saves it in the gameState object.
 */
function gameCreate() {
  //create 20row x 10column board using Tile constructor
  gameState.createBoard();

  //create level while block.. create levelBlocksArray and pop a block into current block

  //call level create
}

document.addEventListener('DOMContentLoaded', console.log('call gameCreate() here using start button'));

/* testing
gameCreate();
gameState.runGame();
*/


