console.log('main.js is running');



let buttons = document.querySelectorAll('button');
buttons[0].addEventListener('mouseover', () => {
  document.getElementById('level').style.color = 'red';
 });
buttons[0].addEventListener('mouseout', () => {
  document.getElementById('level').style.color = 'white';
 });



buttons[1].addEventListener('mouseover', () => {
  document.getElementById('level').style.color = 'red';
 });
buttons[1].addEventListener('mouseout', () => {
  document.getElementById('level').style.color = 'white';
 });
