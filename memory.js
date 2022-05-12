/* eslint-disable no-use-before-define */
const board = document.querySelector('.board');
const apples = document.querySelectorAll('.fa-apple-whole');
const resetButton = document.getElementById('resetButton');
const winDisplay = document.getElementById('win');
const loseDisplay = document.getElementById('lose');
const lastStage = 5;
let stage = 0;
let AMOUNT = 4;
let blockInput = true;
let gameArray = [];
let pressed = [];

// function that hides the array
function hideArray() {
  board.innerHTML = '';
  blockInput = false;
}

// function that displays it
function displayArray() {
  blockInput = true;
  const gameArraytoString = gameArray.join('');
  board.innerHTML = gameArraytoString;
  setTimeout(hideArray, 5000);
}

function removeApples() {
  apples.forEach((e) => {
    e.classList.remove('apple');
  });
}

// function for reset
function reset() {
  gameArray = [];
  pressed = [];
  stage = 0;
  AMOUNT = 4;
  winDisplay.classList.remove('show');
  loseDisplay.classList.remove('show');
  removeApples();
  createArray();
  displayArray();
}

// function that chooses the game stage
function stageProgression(e) {
  if (pressed.length === gameArray.length) {
    const gameArraytoString = gameArray.join('');
    const pressedtoString = pressed.join('');

    // check if win
    if (gameArraytoString === pressedtoString) {
      console.log('stage complete');
      // check if it's the stage 5
      if (stage === lastStage) {
        winDisplay.classList.add('show');
      } else {
        stage += 1;
        AMOUNT += 2;
        removeApples();
        createArray();
      }
    } else {
      console.log('u lose');
      loseDisplay.classList.add('show');
    }
    pressed = [];
  }
}

// function for winning

// function that creates random stage array
function createArray() {
  const base = ['→', '←', '↑', '↓'];
  if (AMOUNT === 4) {
    const randomArray = Array.from({ length: AMOUNT }, () =>
      Math.floor(Math.random() * 4)
    );
    randomArray.forEach((element, index) => {
      gameArray[index] = base[element];
    });
  } else {
    const randomArray = Array.from({ length: 2 }, () =>
      Math.floor(Math.random() * 4)
    );
    randomArray.forEach((element, index) => {
      gameArray[AMOUNT - index - 1] = base[element];
    });
    console.log(gameArray);
    displayArray();
  }
}

createArray();

window.addEventListener('keydown', (e) => {
  const { key } = e;
  if (blockInput === true) return;
  switch (key) {
    case 'ArrowLeft':
      pressed.push('←');
      e.preventDefault();
      break;
    case 'ArrowRight':
      pressed.push('→');
      e.preventDefault();
      break;
    case 'ArrowUp':
      pressed.push('↑');
      e.preventDefault();
      break;
    case 'ArrowDown':
      pressed.push('↓');
      e.preventDefault();
      break;
    default:
      break;
  }

  pressed.forEach((event, index, array) => {
    apples[index].classList.add('apple');
    console.log(apples);
  });

  stageProgression();
});

resetButton.addEventListener('click', reset);
