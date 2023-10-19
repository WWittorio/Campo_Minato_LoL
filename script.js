/* ----------
FASE DI PREPARAZIONE
-------*/
const scoreCounter = document.querySelector(".score-counter");
const loseScreen = document.querySelector(".lose-screen");
const winScreen = document.querySelector(".win-screen");
const playAgainButton = document.querySelectorAll(".play-again-button");
const gameGrid = document.querySelector(".game-grid");

/* ----- */

const totalCell = 60;
const totalBombs = 6;
const maxScore = totalCell - totalBombs;
let bombList = [];
let score = 0;
/* ----- */
/* genera bombe casuali */

/* functions */

function newGame() {
  while (bombList.length < totalBombs) {
    const cellId = Math.floor(Math.random() * totalCell) + 1;
    if (!bombList.includes(cellId)) bombList.push(cellId);
  }

  for (let i = 1; i <= totalCell; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    isCellEven = i % 2 === 0;

    if (isCellEven && isRowEven) cell.classList.add("black-cell");
    else if (!isCellEven && !isRowEven) cell.classList.add("black-cell");

    if (i % 10 === 0) isRowEven = !isRowEven;
    gameGrid.appendChild(cell);

    cell.addEventListener("click", function () {
      console.log("lol");
      if (bombList.includes(i)) {
        cell.classList.add("bomb");
        setTimeout(endGame, 500);
      } else if (!cell.classList.contains("white-cell")) {
        cell.classList.add("white-cell");

        const indexesToCheck = [
          i - 11,
          i - 10,
          i - 9,
          i - 1,
          i + 1,
          i + 9,
          i + 10,
          i + 11,
        ];

        let nearBombs = 0;
        for (index of indexesToCheck) {
          if (bombList.includes(index)) {
            nearBombs++;
          }
        }
        if (nearBombs !== 0) cell.innerText = nearBombs;
        updateScore();
      }

      if (score === maxScore) {
        setTimeout(() => {
          winScreen.classList.remove("hidden");
        });
      }
    });
  }
}

function updateScore() {
  score++;
  scoreCounter.innerText = score.toString().padStart(4, 0);
}

function endGame() {
  loseScreen.classList.remove("hidden");
}

/* Griglia e logica di gioco */
let isCellEven = false;
let isRowEven = false;

function clickOnButton() {
  gameGrid.innerHTML = "";
  score = 0;
  scoreCounter.innerText = score.toString().padStart(4, 0);
  bombList = [];
  newGame();
  loseScreen.classList.add("hidden");
  winScreen.classList.add("hidden");
}

playAgainButton[0].addEventListener("click", clickOnButton);
playAgainButton[1].addEventListener("click", clickOnButton);
newGame();
