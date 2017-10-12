console.log('main.js is running');

let currentLevel = localStorage.getItem('level');
if(currentLevel == null) {
  currentLevel = 1;
  localStorage.setItem('level', `${currentLevel}`)
}

const $level = document.getElementById('levelNum');
$level.innerText = currentLevel;


const buttons = document.querySelectorAll('button');
const $decLevel = buttons[0];
const $incLevel = buttons[1];

// handle the mouse in and out of buttons
$decLevel.addEventListener('mouseover', () => {
  document.getElementById('level').style.color = 'red';
 });
$decLevel.addEventListener('mouseout', () => {
  document.getElementById('level').style.color = 'white';
 });

$incLevel.addEventListener('mouseover', () => {
  document.getElementById('level').style.color = 'red';
 });
$incLevel.addEventListener('mouseout', () => {
  document.getElementById('level').style.color = 'white';
 });

// handle button presses to change level visually and in storage
$decLevel.addEventListener('click', () => {
  if(currentLevel > 1) {
    currentLevel--;
    localStorage.setItem('level', `${currentLevel}`);
    $level.innerText = currentLevel;
  };
 });

$incLevel.addEventListener('click', () => {
  if(currentLevel < 15) {
    currentLevel++;
    localStorage.setItem('level', `${currentLevel}`);
    $level.innerText = currentLevel;
  };
});


//reset button will reset memory
document.getElementById('reset').addEventListener('click', () => {
  localStorage.clear();
})
