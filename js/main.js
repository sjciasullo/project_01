console.log('main.js is running');

let currentLevel = localStorage.getItem('level');
if(currentLevel == null) {
  currentLevel = 1;
  localStorage.setItem('level', `${currentLevel}`)
}

const $level = document.getElementById('levelNum');
$level.innerText = currentLevel;

// On Mouseover of buttons, change color of level to red so user knows
// level will change upon button click
const buttons = document.querySelectorAll('button');
const $decLevel = buttons[0];
const $incLevel = buttons[1];


$decLevel.addEventListener('mouseover', () => {
  document.getElementById('level').style.color = 'red';
 });
$decLevel.addEventListener('mouseout', () => {
  document.getElementById('level').style.color = 'white';
 });
$decLevel.addEventListener('click', () => {
  if(currentLevel > 1) {
    currentLevel--;
    localStorage.setItem('level', `${currentLevel}`);
    $level.innerText = currentLevel;
  };
 });

$incLevel.addEventListener('mouseover', () => {
  document.getElementById('level').style.color = 'red';
 });
$incLevel.addEventListener('mouseout', () => {
  document.getElementById('level').style.color = 'white';
 });
$incLevel.addEventListener('click', () => {
  if(currentLevel < 15) {
    currentLevel++;
    localStorage.setItem('level', `${currentLevel}`);
    $level.innerText = currentLevel;
  };
 });
