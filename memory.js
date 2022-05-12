const board = document.querySelector(".board");
const resetButton = document.getElementById("resetButton");
const winDisplay = document.getElementById("win");
const loseDisplay = document.getElementById("lose");

let stage = 0;
let AMOUNT = 4;
let blockInput = true;
let gameArray = [];
let pressed = [];

// function that hides the array
function hideArray(){
    board.innerHTML= '';
    blockInput= false;
}

// function that displays it
function displayArray() {
    blockInput = true;
    gameArraytoString = gameArray.join('');
    board.innerHTML = gameArraytoString;
    setTimeout(hideArray, 5000);
  }
  
//function for reset
function reset(){
    gameArray=[];
    pressed=[];
    stage = 0;
    AMOUNT = 4;
    createArray();
    displayArray();   
}

// function that chooses the game stage
function stageProgression(e) {
  if (pressed.length === gameArray.length) {
    gameArraytoString = gameArray.join('');
    pressedtoString = pressed.join('');

    // check if win
    if(gameArraytoString === pressedtoString){
        console.log('stage complete')
        //check if it's the stage 5
        if (stage ===5){
            winDisplay.classList.add('show')
        } else{
            stage += 1;
            AMOUNT += 2;
            createArray();
        }
    } else{
        console.log('u lose')
        loseDisplay.classList.add('show')
    }
    pressed =[];

  }
}


// function for winning

// function that creates random stage array
function createArray() {
  const base = ["➡️", "⬅️", "⬆️", "⬇️"];
 if(AMOUNT ===4){
  let randomArray = Array.from({ length: AMOUNT }, () =>
    Math.floor(Math.random() * 4)
  );
  randomArray.forEach((element, index) => {
    gameArray[index] = base[element];
  });
}else{
    let randomArray = Array.from({ length: 2 }, () =>
    Math.floor(Math.random() * 4)
    );
    randomArray.forEach((element, index) => {
        gameArray[AMOUNT-index-1] = base[element];
      });
    console.log(gameArray);
    displayArray();
}

}

createArray();


window.addEventListener("keydown", (e) => {
  const key = e.key;
 if(blockInput== true)return;
  switch (key) {
    case "ArrowLeft":
      pressed.push("⬅️");
      e.preventDefault();
      break;
    case "ArrowRight":
      pressed.push("➡️");
      e.preventDefault();
      break;
    case "ArrowUp":
      pressed.push("⬆️");
      e.preventDefault();
      break;
    case "ArrowDown":
      pressed.push("⬇️");
      e.preventDefault();
      break;
  }
  stageProgression();
});




resetButton.addEventListener('click', reset);
