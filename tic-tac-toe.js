function gameLogic() {
  let currentPlayerIndex = 0;
  const gameBoard = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    symbols: ["X", "O"],
  };

  function updateBoard(row, column) {
    console.log(currentPlayerIndex);
    if (gameBoard.board[row][column] != null) {
      return;
    } else {
      gameBoard.board[row][column] = gameBoard.symbols[currentPlayerIndex];
    }
    if (currentPlayerIndex == 0) {
      currentPlayerIndex++;
    } else if (currentPlayerIndex == 1) {
      currentPlayerIndex--;
    }
    console.log(gameBoard.board);
  }

  const getBoard = () => {
    return gameBoard.board;
  };

  const getPlayerIndex = function () {
    return currentPlayerIndex;
  };

  function checkWin() {
    const boardArr = gameBoard.board;
    if (
      (boardArr[0][0] == boardArr[0][1] &&
        boardArr[0][0] == boardArr[0][2] &&
        boardArr[0][0] == "X") ||
      (boardArr[0][0] == boardArr[1][0] &&
        boardArr[0][0] == boardArr[2][0] &&
        boardArr[0][0] == "X") ||
      (boardArr[1][0] == boardArr[1][1] &&
        boardArr[1][0] == boardArr[1][2] &&
        boardArr[1][0] == "X") ||
      (boardArr[2][0] == boardArr[2][1] &&
        boardArr[2][0] == boardArr[2][2] &&
        boardArr[2][0] == "X") ||
      (boardArr[0][1] == boardArr[1][1] &&
        boardArr[0][1] == boardArr[2][1] &&
        boardArr[0][1] == "X") ||
      (boardArr[0][2] == boardArr[1][2] &&
        boardArr[0][2] == boardArr[2][2] &&
        boardArr[0][0] == "X")
    ) {
      console.log("player one wins");
    } else if (
      (boardArr[0][0] == boardArr[0][1] &&
        boardArr[0][0] == boardArr[0][2] &&
        boardArr[0][0] == "O") ||
      (boardArr[0][0] == boardArr[1][0] &&
        boardArr[0][0] == boardArr[2][0] &&
        boardArr[0][0] == "O") ||
      (boardArr[1][0] == boardArr[1][1] &&
        boardArr[1][0] == boardArr[1][2] &&
        boardArr[1][0] == "O") ||
      (boardArr[2][0] == boardArr[2][1] &&
        boardArr[2][0] == boardArr[2][2] &&
        boardArr[2][0] == "O") ||
      (boardArr[0][1] == boardArr[1][1] &&
        boardArr[0][1] == boardArr[2][1] &&
        boardArr[0][1] == "O") ||
      (boardArr[0][2] == boardArr[1][2] &&
        boardArr[0][2] == boardArr[2][2] &&
        boardArr[0][0] == "O")
    ) {
      console.log("player two wins");
    } else if (
      boardArr[0][0] != null &&
      boardArr[0][1] != null &&
      boardArr[0][2] != null &&
      boardArr[1][0] != null &&
      boardArr[1][1] != null &&
      boardArr[1][2] != null &&
      boardArr[2][0] != null &&
      boardArr[2][1] != null &&
      boardArr[2][2] != null
    ) {
      console.log("draw");
    } else {
      return
    }
  }
  return {
    getBoard,
    updateBoard,
    getPlayerIndex,
    checkWin,
  };
}

function players() {
  let playerOneScore = 0;
  let playerTwoScore = 0;

  function onPlayerOneWin() {
    playerOneScore++;
  }

  function onPlayerTwoWin() {
    playerTwoScore++;
  }
  return {
    onPlayerOneWin,
    onPlayerTwoWin,
  };
}

function game() {
  const startBtn = document.querySelector("#start-btn");
  const gamePanel = document.querySelector(".game");
  const closeBtn = document.querySelector(".close-btn");
  const boardBtns = document.querySelectorAll(".board-button");
  const logic = gameLogic();

  function displayBoard() {
    gamePanel.classList.remove("hidden");
  }

  function closeBoard() {
    gamePanel.classList.add("hidden");
  }

  function closeGame() {
    closeBtn.addEventListener("click", closeBoard);
  }

  function startGame() {
    startBtn.addEventListener("click", displayBoard);
    renderUserAction();
    closeGame();
  }

  function renderUserAction() {
    boardBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const rowIndex = e.target.dataset.row;
        const colIndex = e.target.dataset.col;
        logic.updateBoard(rowIndex, colIndex);
        const boardCopy = logic.getBoard();
        e.target.textContent = boardCopy[rowIndex][colIndex];
        logic.checkWin()
      });
    });
  }
  startGame();
}

game();
