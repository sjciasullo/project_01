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


// TileTracker saves the position of tiles that are used for gameBlocks
function TileTracker (row, column) {
  this.row = row;
  this.column = column;
}

// FIXME may prototype this constructor for all blockTypes
// SquareBlock constructor, will modify gameState.board for init and moves
function SquareBlock () {
  this.className = 'square';
  //tiles could be 2d, but 1d for generalization of adding block to board
  this.tiles = [];
  // set tiles to beginning of board
  for(let i = 0; i < 2; i++) {
    for(let j = 0; j < 2; j++) {
      let tile = new TileTracker(i, j);
      this.tiles.push(tile);
    }
  }

  //returns false if next block cannot be moved down
  this.checkDown = function() {
    //check to see if reached bottom row or next tile is filled
    for(let i = 2; i < 4; i++) {
      if(this.tiles[i].row == 19 ||
        gameState.boardArray[this.tiles[i].row + 1][this.tiles[i].column].occupied){
        return false;
      }
    }
    return true;
  }

  this.moveDown = function() {
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

  this.checkRight = function() {
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

  this.moveRight = function() {
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

  this.checkLeft = function() {
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

  this.moveLeft = function() {
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
}



const gameState = {
 // ------------------------- properties -------------------------

 /** boardArray[rows][columns] == [20 tiles][10 tiles]
  *  made up of tiles {className, occupied, $DOMobj, row, column}
  */
  boardArray: [],

 /**
 * $DOMboard = DOM obj of board array
 *
 * blockArray []
 *     an array made of all the gameBlocks for that level
 *
 * // may not need currentBlock -> may contain currentBlock in blockMove
 * currentBlock = null;
 *    holds the current block that's being moved in the board
 *
 * currentLevel = 0;
 *
 * ------------------------- methods -------------------------
 */

 // pass in a block to add to boardArray
  addBlockToBoard: function(block) {
    for(let i = 0; i < block.tiles.length; i++) {
      //address to change color via boardArray
      const colorRow = block.tiles[i].row;
      const colorColumn = block.tiles[i].column;
      gameState.boardArray[colorRow][colorColumn].$DOMobj.classList.replace('unplayed', `${block.className}`);
    }
  }
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
  gameState.boardArray.push()
  for(let i = 0; i < 20; i++) {
    let row = [];
    for(let j = 0; j < 10; j++) {
      const tile = new Tile(document.createElement('div'), i, j);
      tile.$DOMobj.className = 'tile unplayed';
      row.push(tile);
      document.getElementById('board').appendChild(tile.$DOMobj);
    }
    gameState.boardArray.push(row);
  }



  //call level create



}


document.addEventListener('DOMContentLoaded', console.log('main.js is running'));

/* testing
gameCreate();
let square = new SquareBlock();
gameState.addBlockToBoard(square);
square.moveDown();
*/


