// TODO: Fix game reset and gamefresh isnt changing to true and cant play after won game bug. Check if ai works and everything

// set game variables
var mode = 0; // 0 = 1v1, 1 = ai
var turn = 1; // 0 = player 1, 1 = player 2
var gameFresh = true;
var gameWon = false;

// create buttons to change mode if the game has just begun
document.getElementById("1v1").onclick = function() {
  if (gameFresh) {
    setMode(0);
    resetGame();
  }
}
document.getElementById("ai").onclick = function() {
  if (gameFresh) {
    setMode(1);
    resetGame();
  }
}
document.getElementById("reset").onclick = function() {
  resetGame();
}

// attach a tile select function to each cell, with it's id
for(let i = 0; i < 9; i++) {
  document.getElementById(i.toString()).onclick = function() { tileSelected(i.toString()); }
}

// reset the game with fresh tiles
function resetGame() {
  for (let i = 0; i < 9; i++) {
    document.getElementById(i.toString()).setAttribute("src", "blank.jpg");
  }
  this.gameWon = false;
  this.turn = 1;
  this.gameFresh = true;
  if (mode == 0) {
    document.getElementById("gameprompt").innerHTML = "1v1 mode selected, you may change the mode, x's turn";
  } else {
    document.getElementById("gameprompt").innerHTML = "Ai mode selected, you may change the mode, x's turn";
  }
}

// change the mode of the game
function setMode(mode) {
  this.mode = mode;
}

// change the selected tile
function tileSelected(tiletag) {
  var tile = document.getElementById(tiletag);
  if (tile.getAttribute("src") == "blank.jpg" && gameWon == false) {
    if (this.turn == 1) {
      tile.setAttribute("src", "x.jpg");

      if (this.mode == 0) {
        this.turn = 2;
        document.getElementById("gameprompt").innerHTML = "o's turn";
      }
      else if (this.mode == 1) {
        document.getElementById("gameprompt").innerHTML = "x's turn";
        checkWin();
        aiSelect();
      }
    } else if (this.turn == 2 && this.mode == 0) {
        tile.setAttribute("src", "o.jpg");
        this.turn = 1;
        document.getElementById("gameprompt").innerHTML = "x's turn";

    }
  }
  this.gameFresh = false;
  checkWin();
}

// transfer tiles list into string array for code simplification when tile set is needed for logic
function getCells() {
  let cells = [];
  for (let i = 0; i < 9; i++) {
    if (document.getElementById(i.toString()).getAttribute("src") == "x.jpg") {
      cells.push("x");
    } else if (document.getElementById(i.toString()).getAttribute("src") == "o.jpg") {
      cells.push("o");
    } else {
      cells.push("");
    }
  }

  return cells;
}

// check if there is a win combination present
function checkWin() {
  let cells = getCells();

  for (let i = 0; i < 3; i++) {
    // check horizontal winners
    if ((cells[(3 * i)] == "x" && cells[(3 * i) + 1] == "x" && cells[(3 * i) + 2] == "x") || (cells[(3 * i)] == "o" && cells[(3 * i) + 1] == "o" && cells[(3 * i) + 2] == "o")) {
      playerWin(cells[(3 * i)]);
    }

    // check vertical winners
    if ((cells[i] == "x" && cells[i + 3] == "x" && cells[i + 6] == "x") || (cells[i] == "o" && cells[i + 3] == "o" && cells[i + 6] == "o")) {
      playerWin(cells[i]);
    }
  }

  // check diagonal winners
  if ((cells[0] == "x" && cells[4] == "x" && cells[8] == "x") || (cells[0] == "o" && cells[4] == "o" && cells[8] == "o")
  || (cells[2] == "x" && cells[4] == "x" && cells[6] == "x") || (cells[2] == "o" && cells[4] == "o" && cells[6] == "o")) {
    playerWin(cells[4]);
  }

  // check for draw
  checkDraw();

}

// declare the winner and reset the game
function playerWin(winner) {
  document.getElementById("gameprompt").innerHTML = winner + " has won! You may change the mode, x's turn.";
  this.gameWon = true;
}

// check if there is a draw game and declare the draw if there is
function checkDraw() {
  // check for draw
  let usedCells = 0;
  for (cell in getCells()) {
    if (getCells()[cell] == "x" || getCells()[cell] == "o") {
      usedCells += 1;
    }
  }

  if (usedCells >= 9) {
    this.gameWon = true;
    document.getElementById("gameprompt").innerHTML = "It's a draw! You may change the mode, x's turn";
  }
}

// computer player controller
function aiSelect() {
  let cells = getCells();

  // check if player or computer can win

  // horizontal and vertical possibiltiies
  for (let i = 0; i < 3; i++) {
    if ((cells[(3 * i)] == "x" && cells[(3 * i) + 1] == "x" && cells[(3 * i) + 2] == "") || (cells[(3 * i)] == "o" && cells[(3 * i) + 1] == "o" && cells[(3 * i) + 2] == "")) {
      document.getElementById(((3 * i) + 2).toString()).setAttribute("src", "o.jpg"); return false;
    }
    if ((cells[(3 * i) + 1] == "x" && cells[(3 * i) + 2] == "x" && cells[(3 * i)] == "") || (cells[(3 * i) + 1] == "o" && cells[(3 * i) + 2] == "o" && cells[(3 * i)] == "")) {
      document.getElementById((3 * i).toString()).setAttribute("src", "o.jpg"); return false;
    }
    if ((cells[(3 * i)] == "x" && cells[(3 * i) + 2] == "x" && cells[(3 * i) + 1] == "") || (cells[(3 * i)] == "o" && cells[(3 * i) + 2] == "o" && cells[(3 * i) + 1] == "")) {
      document.getElementById(((3 * i) + 1).toString()).setAttribute("src", "o.jpg"); return false;
    }
    if ((cells[i] == "x" && cells[i + 3] == "x" && cells[i + 6] == "") || (cells[i] == "o" && cells[i + 3] == "o" && cells[i + 6] == "")) {
      document.getElementById((i + 6).toString()).setAttribute("src", "o.jpg"); return false;
    }
    if ((cells[i + 3] == "x" && cells[i + 6] == "x" && cells[i] == "") || (cells[i + 3] == "o" && cells[i + 6] == "o" && cells[i] == "")) {
      document.getElementById(i.toString()).setAttribute("src", "o.jpg"); return false;
    }
    if ((cells[i] == "x" && cells[i + 6] == "x" && cells[i + 3] == "") || (cells[i] == "o" && cells[i + 6] == "o" && cells[i + 3] == "")) {
      document.getElementById((i + 3).toString()).setAttribute("src", "o.jpg"); return false;
    }
  }

  // diagonal possibiltiies
  if((cells[0] == "x" && cells[4] == "x" && cells[8] == "") || (cells[0] == "o" && cells[4] == "o" && cells[8] == "")) {
    document.getElementById("8").setAttribute("src", "o.jpg"); return false;
  }
  if((cells[4] == "x" && cells[8] == "x" && cells[0] == "") || (cells[4] == "o" && cells[8] == "o" && cells[0] == "")) {
    document.getElementById("0").setAttribute("src", "o.jpg"); return false;
  }
  if((cells[0] == "x" && cells[8] == "x" && cells[4] == "") || (cells[0] == "o" && cells[8] == "o" && cells[4] == "")) {
    document.getElementById("4").setAttribute("src", "o.jpg"); return false;
  }
  if((cells[2] == "x" && cells[4] == "x" && cells[6] == "") || (cells[2] == "o" && cells[4] == "o" && cells[6] == "")) {
    document.getElementById("6").setAttribute("src", "o.jpg"); return false;
  }
  if((cells[4] == "x" && cells[6] == "x" && cells[2] == "") || (cells[4] == "o" && cells[6] == "o" && cells[2] == "")) {
    document.getElementById("2").setAttribute("src", "o.jpg"); return false;
  }
  if((cells[2] == "x" && cells[6] == "x" && cells[4] == "") || (cells[2] == "o" && cells[6] == "o" && cells[4] == "")) {
    document.getElementById("4").setAttribute("src", "o.jpg"); return false;
  }

  // randomly select spot
  checkDraw();
  for (let i = 0; i < 9; i++) {
    let choice = Math.floor(Math.random() * 9);
    if (cells[choice] != "x" && cells[choice] != "o") {
      document.getElementById(choice.toString()).setAttribute("src", "o.jpg"); return false;
    }
  }

  return true;
}
