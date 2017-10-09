// ------------------------- notes -------------------------

// Use a 2d array to store the gameBoard
// using a gameState Object to wrap up current state
//    board will be a property of gamestate
//    board could be a 2d array made up of tile objects
//    tile objects will have an occupied state,

// then pieces that we add could have a location property -where they start in the array? or they have tiles and each tile has a location and border properties associated with it

// ------------------------- objects -------------------------
/*   tile constructor
  *    color: white
  *    occupied: false
  *    $DOMlocation: null;
  *    x_loc: position in board
  *    y_loc: position in board
*/

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
 *       x_loc: position in board
 *       y_loc:
 *
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
 *    may return a number of rowscleared
 *
 */

// ------------------------- functions -------------------------

/* gameCreate function
 *    create the board with 20rows by 10columns number of tiles
*/



//document.addEventListener('DOMContentLoaded', );
