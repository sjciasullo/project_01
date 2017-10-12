# project_01 WDI.GeneralAssembly

- Fetris -
Tetris Clone 

Created by Steven Ciasullo

TECHNOLOGIES:
# -- Languages: HTML, CSS, Javascript
# -- Git version control
# -- Object constructors and prototype inheritance
# -- DOM manipulation via Vanilla Javascript

APPROACH:
#  1) Take notes on everything that could be needed -- objects, methods, properties,
-- and general functions.
#  2) Sketch out design in wireframes
#  3) implement basic layout with HTML and CSS
#  4) Implement board and basic setup handling in JS
#  5) Check adding board to the DOM and adjust CSS handling
#  6) Go through object construction and test adding to board with basic functionality
-- Implicit refining of methods and organization as needed.
#  7) Once all object constructors added with basic methods, get pieces to move and 
-- add game logic.
#  8) Finalize design from index moving to game, add layout of extra features 
-- on game page including scoreboard, instructions, hold, and upcoming blocks.
#  9) Implement extra features and test, checking for bugs and debugging 
--moving forward.
# 10) Finalize by removing extra console checks and fixing details of functions.

USER STORIES:
#  User opens index.html for the first time. The user sees a play button,
-- change level, and reset. They have the option of starting the level 
-- between 1 and 15 and click play to initialize the game. When the user
-- sets the first highscore, it is saved in local storage until they would
-- like to reset it on the main page.
-- When user returns, they will find the highscore and level start preserved.
#

WIREFRAMES
#
![Wireframe](./directory/proposal-wireframe.jpg)
--multiple times for other pictures


#

HOW TO USE INSTRUCTIONS
#
# 1) Select starting level by clicking increase/decrease arrow.
# 2) Click "Start" button to open game page
# 3) click games "click me" to initialize game when you are ready
# 4) use keyboard to move, rotate, and store blocks in an effort to fill
-- rows completely. when a row is filled, it will clear. loss condition
-- is fulfilled if a block cannot be successfully dropped from the top.
# 4*) Left,right,down arrows to move; F and D keys to rotate right/left;
-- space bar to store block for later. earn more points by clearing more
-- rows at one time and multiplier increases as level increases. level
-- will increase every 10 rows that you clear. 
# 5) on game end, "game over" prompt opens. click try again to return to 
-- index.html where you can choose level and press start to begin again.
-- Click "Reset" to clear localStorage, setting highscore to 0.

UNSOLVED PROBLEMS
# Adjusting layout with mediaquery through javascript; finishing responsive
-- design and getting elements to line up properly.
# Still want to add a shadow feature which will show where the block is 
-- projected to hit and a drop key that will set the block automatically
-- at that spot.
# Storing multiple highscores in localStorage and displaying on a 
-- highscore page with names. (will need to prompt for name at beginning
-- of game).
# Add images to instructions and add an actual instructions page.
# Add a pause button. 
