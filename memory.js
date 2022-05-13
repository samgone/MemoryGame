/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-undef
const jsConfetti = new JSConfetti();

const board = document.querySelector('.board');
const apples = document.querySelectorAll('.fa-apple-whole');
const resetButton = document.getElementById('resetButton');
const winDisplay = document.getElementById('win');
const loseDisplay = document.getElementById('lose');
const stageDisplay = document.getElementById('stage');
const timerDisplay = document.querySelector('.display_time-left');
const meter = document.getElementById('meter');
const up = document.getElementById('up');
const left = document.getElementById('left');
const right = document.getElementById('right');
const down = document.getElementById('down');
const TIMELEFT = 10;
const lastStage = 5;
let stage = 0;
let AMOUNT = 4;
let blockInput = true;
let blockButton = false;
let gameArray = [];
let pressed = [];
let countdown;

// function that hides the array
function hideArray() {
  board.innerHTML = '';
  blockInput = false;
  blockButton = false;
  resetButton.classList.remove('disabled');
  meter.style.width = '90%';
  timer(TIMELEFT);
  console.log(gameArray);
}

// function that displays it
function displayArray() {
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
  clearInterval(countdown);
  displayTimeLeft(0);
  createArray();
}

// GameOver function
function gameOver() {
  loseDisplay.classList.add('show');
  clearInterval(countdown);
  jsConfetti.addConfetti({ emojis: ['💩'] });
}

function showStageDivider() {
  blockInput = true;
  blockButton = true;
  resetButton.classList.add('disabled');
  stageDisplay.innerHTML = `Stage ${stage + 1} 🎉`;
  stageDisplay.classList.add('show');
}

// function that chooses the game stage
function stageProgression() {
  if (pressed.length === gameArray.length) {
    const gameArraytoString = gameArray.join('');
    const pressedtoString = pressed.join('');

    // check if win
    if (gameArraytoString === pressedtoString) {
      // check if it's the stage 5
      if (stage === lastStage) {
        winDisplay.classList.add('show');
        clearInterval(countdown);
        jsConfetti.addConfetti({ emojis: ['🎉', '🎓', '🥳'] });
      } else {
        stage += 1;
        AMOUNT += 2;
        showStageDivider();
        displayTimeLeft(0);
        removeApples();
        clearInterval(countdown);
        setTimeout(() => {
          stageDisplay.classList.remove('show');
          createArray();
        }, 3000);
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
    showStageDivider();
    setTimeout(() => {
      stageDisplay.classList.remove('show');
      displayArray();
    }, 3000);
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
    if (secondsLeft === 0) {
      gameOver();
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

// displays timer and meter
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  timerDisplay.textContent = display;

  meter.style.width = `${9 * remainderSeconds}%`;
}

// adds apples
function appleDisplay() {
  pressed.forEach((event, index) => {
    apples[index].classList.add('apple');
  });
}

displayTimeLeft(0);
meter.style.width = '0%';

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

  appleDisplay();

  stageProgression();
});

resetButton.addEventListener('click', () => {
  if (blockButton === false) {
    reset();
  }
});

// mobil keys
up.addEventListener('click', () => {
  if (blockInput === true) return;
  pressed.push('↑');
  appleDisplay();
  stageProgression();
});
down.addEventListener('click', () => {
  if (blockInput === true) return;
  pressed.push('↓');
  appleDisplay();
  stageProgression();
});
left.addEventListener('click', () => {
  if (blockInput === true) return;
  pressed.push('←');
  appleDisplay();
  stageProgression();
});
right.addEventListener('click', () => {
  if (blockInput === true) return;
  pressed.push('→');
  appleDisplay();
  stageProgression();
});
