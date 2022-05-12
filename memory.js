/* eslint-disable no-use-before-define */
const board = document.querySelector('.board');
const apples = document.querySelectorAll('.fa-apple-whole');
const resetButton = document.getElementById('resetButton');
const winDisplay = document.getElementById('win');
const loseDisplay = document.getElementById('lose');
const timerDisplay = document.querySelector('.display_time-left');
const TIMELEFT = 10;
const lastStage = 5;
let stage = 0;
let AMOUNT = 4;
let blockInput = true;
let gameArray = [];
let pressed = [];
let countdown;

// function that hides the array
function hideArray() {
  board.innerHTML = '';
  blockInput = false;
  timer(TIMELEFT);
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
  clearInterval(countdown);
  displayTimeLeft(0);
}

// GameOver function
function gameOver() {
  loseDisplay.classList.add('show');
}

// function that chooses the game stage
function stageProgression() {
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
        displayTimeLeft(0);
        removeApples();
        createArray();
      }
    } else {
      gameOver();
    }
    pressed = [];
  }
}

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
    displayArray();
  }
}

// timer

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      displayTimeLeft(0);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
  console.log(countdown);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}
// timer

displayTimeLeft(0);
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

  pressed.forEach((event, index) => {
    apples[index].classList.add('apple');
    console.log(apples);
  });

  stageProgression();
});

resetButton.addEventListener('click', reset);
