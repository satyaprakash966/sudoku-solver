function createBoard() {
  const board = document.getElementById('sudoku-board');
  for (let row = 0; row < 9; row++) {
    const tr = document.createElement('tr');
    for (let col = 0; col < 9; col++) {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'number';
      input.min = '1';
      input.max = '9';
      td.appendChild(input);
      tr.appendChild(td);
    }
    board.appendChild(tr);
  }
}

function getBoard() {
  const board = [];
  const rows = document.querySelectorAll('tr');
  rows.forEach(row => {
    const rowData = [];
    const cells = row.querySelectorAll('input');
    cells.forEach(cell => {
      rowData.push(cell.value === "" ? 0 : parseInt(cell.value));
    });
    board.push(rowData);
  });
  return board;
}

function setBoard(board) {
  const inputs = document.querySelectorAll('input');
  let i = 0;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      inputs[i].value = board[row][col] === 0 ? "" : board[row][col];
      i++;
    }
  }
}

function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
    const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const boxCol = 3 * Math.floor(col / 3) + i % 3;
    if (board[boxRow][boxCol] === num) return false;
  }
  return true;
}

function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solveSudoku() {
  const board = getBoard();
  if (solve(board)) {
    setBoard(board);
    alert("Solved!");
  } else {
    alert("No solution found.");
  }
}

function clearBoard() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => input.value = '');
}

createBoard();