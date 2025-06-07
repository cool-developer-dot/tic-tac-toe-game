// Selecting all elements
let boxe = document.querySelectorAll(".boxe");
let resetButton = document.querySelector(".button");
let newGameBtn = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let startGameBtn = document.querySelector("#start-game");
let playerOInput = document.querySelector("#playerO");
let playerXInput = document.querySelector("#playerX");
let gameBoard = document.querySelector(".game");
let resetContainer = document.querySelector(".reset-container");

// Game state
let turnO = true;
let filledBoxes = 0;
let gameOver = false;
let playerO = "Player O";
let playerX = "Player X";

// All winning combinations
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Reset the game
const resetGame = () => {
  turnO = true;
  filledBoxes = 0;
  gameOver = false;
  enableBoxes();
  msgContainer.classList.add("hide");
  newGameBtn.classList.add("hide"); // Hide new game button again
};

// Disable all boxes
const disableBoxes = () => {
  boxe.forEach((box) => box.disabled = true);
};

// Enable all boxes
const enableBoxes = () => {
  boxe.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("x", "o");
  });
};

// Show winner message
const showWinner = (winner) => {
  const name = winner === "O" ? playerO : playerX;
  msg.innerText = `Congratulations! Winner is ${name}`;
  msgContainer.classList.remove("hide");
  newGameBtn.classList.remove("hide"); // Show new game button
  gameOver = true;
  disableBoxes();
};

// Check for draw
const checkDraw = () => {
  if (filledBoxes === 9 && !gameOver) {
    msg.innerText = "Match Drawn!";
    msgContainer.classList.remove("hide");
    newGameBtn.classList.remove("hide"); // Show new game button
    gameOver = true;
  }
};

// Check winner logic
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos0 = boxe[pattern[0]].innerText;
    let pos1 = boxe[pattern[1]].innerText;
    let pos2 = boxe[pattern[2]].innerText;

    if (pos0 !== "" && pos1 !== "" && pos2 !== "") {
      if (pos0 === pos1 && pos1 === pos2) {
        showWinner(pos0);
        return true;
      }
    }
  }
  return false;
};

// Game play logic
boxe.forEach((box) => {
  box.addEventListener("click", () => {
    if (gameOver) return;

    if (turnO) {
      box.innerText = "O";
      box.classList.add("o");
    } else {
      box.innerText = "X";
      box.classList.add("x");
    }

    box.disabled = true;
    filledBoxes++;

    if (!checkWinner()) {
      checkDraw();
    }

    turnO = !turnO;
  });
});

// Button events
newGameBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);

// Start game with names
startGameBtn.addEventListener("click", () => {
  playerO = playerOInput.value || "Player O";
  playerX = playerXInput.value || "Player X";

  document.querySelector(".input-container").classList.add("hide");
  gameBoard.classList.remove("hide");
  resetContainer.classList.remove("hide");
  newGameBtn.classList.add("hide"); // Ensure new game is hidden at start

  resetGame();
});
