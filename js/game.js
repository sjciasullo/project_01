/** To-do
 *
 * fix square constructor -- put cross above it and inherit cross
 *
 * fix rotate to check for boundary of board so error doesn't throw
 *
 * take out console.logs
 *
 * change step orientations to account for oddity in rotating from bottom
 *
 * add scoring for line clears
 *
 * update dom w score
 *
 * prompt for name and start level
 *
 * when the game ends prompt a game over with your score, tell user they set a
 * new high score if they did
 *
 * add shadow locator
 *
 * add drop button
 *
 * add block holder function
 *
 * change level timer functionality  -> if player finishes level 15 maybe
 * give a you win option
 *
 * add javascript media query to size of board so that it can switch to
 * change to two column layout
 *
 * add media query for one column design
 */
// ------------------------- objects -------------------------

function Tile ($DOM) {
  this.occupied = false;
  this.$DOMobj = $DOM;
}

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
// can be generalized to use cross prototype
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

// --------------------------- GAMESTATE ------------------------------


const gameState = {
 // ------------------------- properties -------------------------

 /** boardArray[rows][columns] == [20 tiles][10 tiles]
  *  made up of tiles {className, occupied, $DOMobj, row, column}
  */
  boardArray: [], //array of tiles that make up game board
  blockArray: [], //array of blocks to be added to gameBoard
  smallBoards: [],
  currentLevel: 1, //+ every 10 lnsClrd
  $currentLevel: document.getElementById('currentLevel'),
  highScore: 0,
  $highScore: document.getElementById('highScore'),
  score: 0,
  $score: document.getElementById('score'),
  linesCleared: 0, //increases if told to by checkClear
  $linesCleared: document.getElementById('linesCleared'),
  newHighScore: false,

 // ------------------------- methods -------------------------

 // return 2d array with numRows of rows of tiles
  createRows: function(numRows) {
    let finalArr = [];
    for(let i = 0; i < numRows; i++) {
      let row = [];
      for(let j = 0; j < 10; j++) {
        const tile = new Tile(document.createElement('div'));
        tile.$DOMobj.className = 'tile unplayed';
        row.push(tile);
      }
      finalArr.push(row);
    }
    return finalArr;
  },

 // create gameBoard, hold board, and upcoming boards
  createBoard: function() {
    //create regular playing board
    const numRows = 20;
    const numColumns = 10;
    this.boardArray = this.createRows(numRows);
    const $board = document.getElementById('board');
    for(let i = 0; i < numRows; i++) {
      for(let j = 0; j < numColumns; j++) {
        $board.appendChild(this.boardArray[i][j].$DOMobj);
      }
    }

    //create board to add to small boards
    const smallRows = 2;
    const smallCols = 4;
    const $hold = document.getElementById('holdBoard');
    //or get const smallBoards array and just loop through it
    const $smallBoards = document.getElementsByClassName('smallBoard');

    for(let h = 0; h < 4; h++) {
      let smallBoard = [];
      for(let i = 0; i < smallRows; i++) {
        let row = [];
        for(let j = 0; j < smallCols; j++) {
          const tile = new Tile(document.createElement('div'));
          tile.$DOMobj.className = 'tile unplayed';
          row.push(tile);
          $smallBoards[h].appendChild(tile.$DOMobj);
          // $hold.appendChild(tile.$DOMobj);
        }
        smallBoard.push(row);
      }
      //save into gameState, mostly for the $DOMobj
      this.smallBoards.push(smallBoard);
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

 // add block to small board where index indicates which small board adding to
  addBlockToSmall: function(block, index) {
    for(let i = 0; i < block.tiles.length; i++) {
      //address to change color via boardArray
      const colorRow = block.tiles[i].row;
      //subtract 3 to account for smaller board
      const colorColumn = block.tiles[i].column - 3;
      this.smallBoards[index][colorRow][colorColumn].$DOMobj.classList.replace('unplayed', `${block.className}`);
    }
  },

  //makes selected smallBoard clear
  removeBlockFromSmall: function(block, index) {
    for(let row = 0; row < 2; row++) {
      for(let column = 0; column < 4; column++) {
        this.smallBoards[index][row][column].$DOMobj.classList.replace(`${block.className}`,'unplayed',);
      }
    }
  },

 // set block into position, for end of move
 // returns true if valid entry, false if cannot enter
  setBlockInBoard: function(block) {
    for(let i = 0; i < block.tiles.length; i++) {
      let boardRow = block.tiles[i].row;
      let boardCol = block.tiles[i].column;
      if(this.boardArray[boardRow][boardCol].occupied) {return false;}
      else {this.boardArray[boardRow][boardCol].occupied = true;}
    }
    // console.log('block commited to board');
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
          const tile = new Tile(document.createElement('div'));
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

    //add remaining blocks to upcoming blocks board
    for(let i = 0; i < 3; i++) {
      this.addBlockToSmall(this.blockArray[i], 3-i);
    }

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

    let ms = 1300 - (this.currentLevel * 80);
    if(ms < 100) {ms = 100;}
    let intervalN = window.setInterval(() => {
      if(currentBlock.checkDown()) {
        currentBlock.moveDown();
      } else {
        // console.log('Block finished');

        //set current block in board
        endGame = !(this.setBlockInBoard(currentBlock));
        // console.log(`end game is ${endGame}`);

        if(endGame) {
          // console.log('ur game is over, fool');
          window.clearInterval(intervalN);

          //delete all the tiles
          // let deleteTiles = Array.from(document.getElementsByClassName('tile'));
          // for(let i = 0; i < deleteTiles.length; i++) {
          //   let $parent = deleteTiles[i].parentNode;
          //   $parent.removeChild(deleteTiles[i]);
          // }
          if(this.newHighScore) {
            document.querySelector('p').innerText = `You set a new high score of ${this.highScore}! Congratulations!`
          }
          document.getElementById('gameOver').style.visibility = 'visible';


        } else {
          console.log('create new block.');
          //clear upcoming blocks
          // for(let i = 0; i < this.blockArray.length; i++) {
          //   //+1 because 0 is the hold sideBoard
          //   this.removeBlockFromSmall(this.blockArray[i], i+1);
          // }
          this.removeBlockFromSmall(this.blockArray[0], 3);
          this.removeBlockFromSmall(this.blockArray[1], 2);
          this.removeBlockFromSmall(this.blockArray[2], 1);

          //add block to blocksArray
          this.createBlocks(1);

          //make new blocks on upcoming
          this.addBlockToSmall(this.blockArray[1], 3);
          this.addBlockToSmall(this.blockArray[2], 2);
          this.addBlockToSmall(this.blockArray[3], 1);

          //pop off front to currentBlock
          currentBlock = this.blockArray.shift();

          //check for rows cleared
          let rowsCleared = this.clearRows();
          this.linesCleared += rowsCleared;

          //update linesCleared on scoreboard
          this.$linesCleared.innerText = `${this.linesCleared}`;
          if(this.linesCleared % 10 == 0 && this.linesCleared > 0) {
            this.currentLevel += 1;
            $currentLevel.innerHTML = this.currentLevel;
          }

          //calculate points to add
          let pointsAdded = 0;
          if(rowsCleared == 1){pointsAdded+=5;}
          if(rowsCleared == 2){pointsAdded+=15;}
          if(rowsCleared == 3){pointsAdded+=30;}
          if(rowsCleared == 4){pointsAdded+=50;}
          pointsAdded += pointsAdded * .2 * this.currentLevel;
          this.score += pointsAdded;
          this.$score.innerText = this.score;

          //check if bigger than highscore and update accordingly
          if(this.score > this.highScore) {
            this.highScore = this.score;
            this.newHighScore = true;
            this.$highScore.innerText = this.highScore;
            localStorage.setItem('highScore', `${this.highScore}`)
          }


          this.addBlockToBoard(currentBlock);
        }
      }
    }, ms);
  },
}

// ------------------------- functions -------------------------

/**
 * This function creates the board and saves it in the gameState object.
 */
function gameCreate() {
  //create 20row x 10column board using Tile constructor
  gameState.createBoard();
  setTimeout(gameState.runGame(), 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  //add event listener to start button which erases start button, then calls gameCreate

  //set already known scoreboard into DOM

  gameState.$score.innerText = `${gameState.score}`;
  gameState.$linesCleared.innerText = `${gameState.linesCleared}`;

  //check for level
  gameState.currentLevel = localStorage.getItem('level');
  if(gameState.currentLevel == null) {
    gameState.currentLevel = 1;
    localStorage.setItem('level', `${gameState.currentLevel}`)
  }
  gameState.$currentLevel.innerText = `${gameState.currentLevel}`;


  //check for highScore
  gameState.highScore = localStorage.getItem('highScore');
  if(gameState.highScore == null) {
    gameState.highScore = 0;
    localStorage.setItem('highScore', `${gameState.highScore}`)
  }

  //add highscore add to DOM
  gameState.$highScore.innerText = `${gameState.highScore}`;

  //
  //gameCreate();
  //gameState.runGame();


});


