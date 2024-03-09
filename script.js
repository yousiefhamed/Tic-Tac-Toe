let currentPlayer = "X";
const NUMBER_OF_ROWS = 4;
const turns = NUMBER_OF_ROWS ** 2;
let turnsCounter = 0;

const createBoardArray = () => {
  const board = [];
  for (let row = 0; row < NUMBER_OF_ROWS; row += 1) {
    board.push(Array.from({ length: NUMBER_OF_ROWS }, () => "_"));
  }
  return board;
};

let board = createBoardArray();
const resetButton = document.querySelector("#reset");

const getCellPlacement = (index, numberOfRows) => {
  const row = Math.floor(index / numberOfRows);
  const col = index % numberOfRows;

  return [row, col];
};

const checkRows = () => {
  let column = 0;

  for (let row = 0; row < NUMBER_OF_ROWS; row += 1) {
    while (column < NUMBER_OF_ROWS) {
      if (board[row][column] !== currentPlayer) {
        column = 0;
        break;
      }
      column += 1;
    }

    if (column === NUMBER_OF_ROWS) {
      return true;
    }
  }
  return false;
};

const checkColumns = () => {
  let row = 0;

  for (let column = 0; column < NUMBER_OF_ROWS; column += 1) {
    while (row < NUMBER_OF_ROWS) {
      if (board[row][column] !== currentPlayer) {
        row = 0;
        break;
      }
      row += 1;
    }

    if (row === NUMBER_OF_ROWS) {
      return true;
    }
  }
  return false;
};

const checkDiagonals = () => {
  let count = 0;

  while (count < NUMBER_OF_ROWS) {
    if (board[count][count] !== currentPlayer) {
      count = 0;
      break;
    }
    count += 1;
  }

  if (count === NUMBER_OF_ROWS) {
    return true;
  }

  return false;
};

const checkReverseDiagonals = () => {
  let count = 0;

  while (count < NUMBER_OF_ROWS) {
    if (board[count][NUMBER_OF_ROWS - 1 - count] !== currentPlayer) {
      count = 0;
      break;
    }
    count += 1;
  }

  if (count === NUMBER_OF_ROWS) {
    return true;
  }
  return false;
};

const checkWin = () => (
  checkRows()
      || checkColumns()
      || checkDiagonals()
      || checkReverseDiagonals()
);

const drawMarkInCell = (cell) => {
  const cellValue = cell.querySelector(".value");
  cellValue.textContent = currentPlayer;
  cell.classList.add(`cell--${currentPlayer}`);
};

const createCell = (index) => {
  const cellElementString = `<div class="cell" role="button" tabindex="${index + 1}"><span class="value"></span></div>`;
  const cellElement = document.createRange().createContextualFragment(cellElementString);

  cellElement.querySelector(".cell").onclick = (event) => cellClickHandler(event, index);
  cellElement.querySelector(".cell").onkeydown = (event) => (event.key === "Enter" ? cellClickHandler(event, index) : true);

  return cellElement;
};

const createBoard = () => {
  const container = document.querySelector(".container");
  const boardDiv = document.createElement("div");

  boardDiv.classList.add("board");

  for (let i = 0; i < NUMBER_OF_ROWS ** 2; i += 1) {
    const cellElement = createCell(i);
    boardDiv.appendChild(cellElement);
    document.documentElement.style.setProperty("--grid-rows", NUMBER_OF_ROWS);
  }

  container.insertAdjacentElement("afterbegin", boardDiv);
};

const resetBoard = () => {
  document.querySelector(".board").remove();
  createBoard();
  board = createBoardArray();

  currentPlayer = "X";
  turnsCounter = 0;
};

const runWinEvent = () => {
  setTimeout(() => {
    alert(`Player ${currentPlayer} won!`);
    resetBoard();
  }, 100);
};

const runDrawEvent = () => {
  setTimeout(() => {
    alert("Draw!");
    resetBoard();
  }, 100);
};

const cellClickHandler = (event, index) => {
  const cell = event.target;
  const [row, col] = getCellPlacement(index, NUMBER_OF_ROWS);

  if (board[row][col] === "_") {
    turnsCounter += 1;
    board[row][col] = currentPlayer;

    drawMarkInCell(cell);

    if (checkWin(currentPlayer)) {
      runWinEvent();
    } else {
      if (turnsCounter === turns) runDrawEvent();

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
};

resetButton.addEventListener("click", resetBoard);
createBoard();
