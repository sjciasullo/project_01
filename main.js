// ------------------------- objects -------------------------
/*   tile constructor
  *    color: white
  *    occupied: false
  *    $DOMlocation: null;
  *    row: position in board
  *    column: position in board
*/
function Tile (color, $DOM, row, column) {
  this.color = color;
  this.occupied = false;
  this.$DOMobj = $DOM;

  // FIXME may need to delete row and column if unused
  this.row = row;
  this.column = column;
}

/*   gameBlocks constructor
  *    an array holding tiles
*/

function TileTracker (row, column) {
  this.row = row;
  this.column = column;
}

function SquareBlock (color) {
  this.color = color;
  this.tiles = [];
  for(let i = 0; i < 2; i++) {
    let row = [];
    for(let j = 0; j < 2; j++) {
      row.push(new TileTracker(i, j));
    }
    tiles.push(row);
  }

  this.moveDown = function() {
  }

  this.moveRight = function() {

  }

  this.moveLeft = function() {

  }
}


const gameState = {
 // ------------------------- properties -------------------------

 /** boardArray[rows][columns] == [20 tiles][10 tiles]
  *  made up of tiles {color, occupied, $DOMobj, row, column}
  */
  boardArray: [],

 /*
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
 *
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
      const tile = new Tile('white', document.createElement('div'), i, j);
      tile.$DOMobj.className = 'tile';
      tile.$DOMobj.style.backgroundColor = 'white';
      row.push(tile);
      document.getElementById('board').appendChild(tile.$DOMobj);
    }
    gameState.boardArray.push(row);
  }



  //call level create



}


document.addEventListener('DOMContentLoaded', console.log('main.js is running'));
