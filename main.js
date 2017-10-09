console.log('main.js is running');

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
  this.row = row;
  this.column = column;
}

/*   gameBlocks constructor
  *    an array holding tiles
*/


/* gameState {
 *
 * ------------------------- properties -------------------------
 *
 * boardArray[x][y]
 *    tiles
 *       color:
 *       occupied: boolean
 *       $DOMlocation:
 *       row: position in board
 *       column: position in board
 *
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

// ------------------------- functions -------------------------

/* gameCreate function
 *    create the board with 20rows by 10columns number of tiles
*/



// game logic
/*
gameCreate() triggered by start button on index.html
  levelCreate(currentLevel)
  --currentLevel = 1;
  --create blocks for level
      while(!endMove){ blockMove }
      if no loss, then go back to level create with increased level count
*/

function gameCreate() {
  //create 20row x 10column board
  let finalBoard = [];
  for(let i = 0; i < 20; i++) {
    let row = [];
    for(let j = 0; j < 10; j++) {
      const tile = new Tile('white', document.createElement('div'), i, j);
      tile.$DOMobj.className = 'tile';
      tile.$DOMobj.style.backgroundColor = 'white';
      row.push(tile);
      document.getElementById('board').appendChild(tile.$DOMobj);
    }
    finalBoard.push(row);
  }
  //call level create
}


//document.addEventListener('DOMContentLoaded', );
