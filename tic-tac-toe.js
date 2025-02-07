function gameLogic(play) {
  let currentPlayerIndex = 0;
  const gameBoard = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    symbols: ["X", "O"],
  };

  // const play = players();

  function updateBoard(row, column) {
    // console.log(currentPlayerIndex);
    if (gameBoard.board[row][column] != null) {
      return;
    } else {
      gameBoard.board[row][column] = gameBoard.symbols[currentPlayerIndex];
      switchTurn();
    }
    // console.log(gameBoard.board);
  }

  const getBoard = () => {
    return gameBoard.board;
  };

  const getPlayerIndex = function () {
    return currentPlayerIndex;
  };

  function switchTurn() {
    if (currentPlayerIndex == 0) {
      currentPlayerIndex++;
    } else if (currentPlayerIndex == 1) {
      currentPlayerIndex--;
    }
  }

  function checkWin(symbol) {
    const boardArr = gameBoard.board;

    for (let row = 0; row <= 2; row++) {
      if (
        (boardArr[row][0] == boardArr[row][1] &&
          boardArr[row][0] == boardArr[row][2] &&
          boardArr[row][0] == symbol) ||
        (boardArr[0][row] == boardArr[1][row] &&
          boardArr[0][row] == boardArr[2][row] &&
          boardArr[0][row] == symbol) ||
        (boardArr[0][0] == boardArr[1][1] &&
          boardArr[0][0] == boardArr[2][2] &&
          boardArr[0][0] == symbol) ||
        (boardArr[0][2] == boardArr[1][1] &&
          boardArr[0][2] == boardArr[2][0] &&
          boardArr[0][2] == symbol)
      ) {
        play.playerWin(currentPlayerIndex);
        play.updateScore(currentPlayerIndex);

        resetBoard();
        return;
      }
    }
    if (boardArr.flat().filter((item) => item == null).length == 0) {
      alert("draw");
      resetBoard();
    }
    
  }

  function resetBoard() {
    const Game = game();
    gameBoard.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    currentPlayerIndex = 0;
    Game.resetGame();
  }

  

  return {
    getBoard,
    updateBoard,
    getPlayerIndex,
    checkWin,
    resetBoard,
  };
}

function players() {
  let scores = {
    player1: 0,
    player2: 0,
  };

  function getPlayerNames(name1, name2) {
    name1 = prompt("player one name :", "Player One");
    name2 = prompt("player two name :", "Player Two");
    return {
      name1,
      name2,
    };
  }

  function renderPlayerNames() {
    const names = getPlayerNames();
    const playerOne = document.querySelector(".player-one-name");
    const playerTwo = document.querySelector(".player-two-name");
    playerOne.textContent = names.name1;
    playerTwo.textContent = names.name2;
  }

  function renderPlayerScore() {
    const playerOneDisplay = document.querySelector(".player-one-score");
    const playerTwoDisplay = document.querySelector(".player-two-score");
    playerOneDisplay.textContent = scores.player2;
    playerTwoDisplay.textContent = scores.player1;
  }

  function playerWin(index) {
    if (index == 0) {
      alert("player two wins");
    } else if (index == 1) {
      alert("player one wins");
    }
  }

  function resetPlayerScore() {
    scores.player1 = 0;
    scores.player2 = 0;
    renderPlayerScore();
  }

  function updateScore(index) {
    if (index == 0) {
      scores.player1++;
    } else if (index == 1) {
      scores.player2++;
    }
    console.log(scores.player1 + ":" + scores.player2);
    renderPlayerScore();
  }

  function getPlayerOneScore() {
    console.log(scores.player1)
    return scores.player1;
  }
  function getPlayerTwoScore() {
    return scores.player2;
  }

  return {
    playerWin,
    updateScore,
    resetPlayerScore,
    renderPlayerScore,
    getPlayerNames,
    renderPlayerNames,
    getPlayerOneScore,
    getPlayerTwoScore,
  };
}

function game() {
  const startBtn = document.querySelector("#start-btn");
  const gamePanel = document.querySelector(".game");
  const closeBtn = document.querySelector(".close-btn");
  const boardBtns = document.querySelectorAll(".board-button");
  
  const Players = players();
  const logic =gameLogic(Players)

  function displayBoard() {
    gamePanel.classList.remove("hidden");
    const Players = players();
    Players.renderPlayerNames();
    Players.renderPlayerScore();
  }

  function closeBoard() {
    gamePanel.classList.add("hidden");
    logic.resetBoard();
    Players.resetPlayerScore();
  }

  function closeGame() {
    closeBtn.addEventListener("click", closeBoard);
  }

  function startGame() {
    startBtn.addEventListener("click", displayBoard);
    Players.resetPlayerScore();
    renderUserAction();
    closeGame();
  }

  function handleClick(e) {
    const rowIndex = e.target.dataset.row;
    const colIndex = e.target.dataset.col;
    logic.updateBoard(rowIndex, colIndex);
    const boardCopy = logic.getBoard();
    e.target.textContent = boardCopy[rowIndex][colIndex];
    if (e.target.textContent == "X" || e.target.textContent == "O") {
      logic.checkWin(e.target.textContent);
    }
  }

  function renderUserAction() {
    boardBtns.forEach((btn) => {
      btn.addEventListener("click", handleClick);
    });
  }

  function resetGame() {
    boardBtns.forEach((btn) => {
      btn.removeEventListener("click", handleClick);
      btn.textContent = "";
    });
  }

  return {
    resetGame,
    startGame,
  };
}
const Game = game();
Game.startGame();
