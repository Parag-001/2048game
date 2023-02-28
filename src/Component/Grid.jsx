import React, { useEffect, useMemo, useState } from "react";
import TableData from "./TableData";

const Grid = () => {
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [score, setScore] = useState(0);
  const [Status, setStatus] = useState("");
  let high = localStorage.getItem("HighScore") || 0;
  if (score > high) {
    localStorage.setItem("HighScore", score);
  }

  var initialX = null;
  var initialY = null;

  function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  }

  function moveTouch(e) {
    if (initialX === null) {
      return;
    }

    if (initialY === null) {
      return;
    }

    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;

    var diffX = initialX - currentX;
    var diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      // sliding horizontally
      if (diffX > 0) {
        setGrid(moveLeft(grid));
      } else {
        setGrid(moveRight(grid));
      }
    } else {
      if (diffY > 0) {
        setGrid(moveUp(grid));
      } else {
        setGrid(moveDown(grid));
      }
    }

    initialX = null;
    initialY = null;

    // e.preventDefault();
  }

  const Value = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          return true;
        }
      }
    }
    return false;
  };
  const CheckOverGame = (board, allError) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== allError[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  const CheckOver = (grid) => {
    if (!Value(grid)) {
      if (
        CheckOverGame(grid, moveLeft(grid)) &&
        CheckOverGame(grid, moveRight(grid)) &&
        CheckOverGame(grid, moveUp(grid)) &&
        CheckOverGame(grid, moveDown(grid))
      ) {
        alert("Game Over");
        Reset();
        setStatus("Game Over");
      }
    }
  };

  const randomPosition = () => {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    return [row, col];
  };

  const generateRandom = (grid, flag) => {
    let [row, col] = randomPosition();
    while (grid[row][col] !== 0) {
      [row, col] = randomPosition();
    }

    grid[row][col] = 2;
    if (flag) {
      generateRandom(grid);
    }
    return grid;
  };
  useMemo(() => {
    return generateRandom(grid, true);
  }, []);
  // useEffect(() => {
  //   generateRandom(grid, true);
  // }, []);

  const generateBoard = () =>
    new Array(4).fill(null).map(() => new Array(4).fill(0));

  const sideLeft = (board) => {
    let newGrid = generateBoard();
    for (let i = 0; i < board.length; i++) {
      let col = 0;
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== 0) {
          newGrid[i][col] = board[i][j];
          col++;
        }
      }
    }
    return newGrid;
  };
  const sideRight = (board) => {
    let newGrid = generateBoard();
    for (let i = grid.length - 1; i >= 0; i--) {
      let col = 3;
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== 0) {
          newGrid[i][col] = board[i][j];
          col--;
        }
      }
    }
    return newGrid;
  };
  const CheckWinner = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 2048) {
          alert("You Won Game");
          Reset();
        }
      }
    }
  };
  const Up = (board) => {
    let newBoard = generateBoard();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        newBoard[i][j] = board[j][board.length - 1 - i];
      }
    }
    return newBoard;
  };
  const Down = (board) => {
    let newBoard = generateBoard();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        newBoard[i][j] = board[board.length - 1 - j][i];
      }
    }
    return newBoard;
  };

  const merge = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length - 1; j++) {
        if (board[i][j] > 0 && board[i][j] === board[i][j + 1]) {
          setScore(score + board[i][j] * 2);
          board[i][j] = board[i][j] * 2;
          board[i][j + 1] = 0;
        }
      }
    }
    return [board];
  };

  const moveLeft = (board) => {
    let flag;
    const nBoard1 = sideLeft(board);
    const [nBoard2] = merge(nBoard1);
    const nBoard3 = sideLeft(nBoard2);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (board[i][j] !== nBoard3[i][j]) {
          flag = true;
        }
      }
    }
    if (flag) {
      generateRandom(nBoard3);
    }
    return nBoard3;
  };
  const moveRight = (board) => {
    let flag;
    const nBoard1 = sideRight(board);
    const [nBoard2] = merge(nBoard1);
    const nBoard3 = sideRight(nBoard2);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] !== nBoard3[i][j]) {
          flag = true;
        }
      }
    }
    if (flag) {
      generateRandom(nBoard3);
    }
    return nBoard3;
  };
  const moveUp = (board) => {
    const nBoard = Up(board);
    const nBoard2 = moveLeft(nBoard);
    const res = Down(nBoard2);
    return res;
  };
  const moveDown = (board) => {
    const nBoard = Down(board);
    const nBoard2 = moveLeft(nBoard);
    const res = Up(nBoard2);
    return res;
  };

  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        setGrid(moveLeft(grid));
        break;
      case "ArrowRight":
        setGrid(moveRight(grid));
        break;
      case "ArrowUp":
        setGrid(moveUp(grid));
        break;
      case "ArrowDown":
        setGrid(moveDown(grid));
        break;
      default:
        break;
    }
  };
  const Reset = () => {
    const a = generateBoard();
    const nu = generateRandom(a, true);
    setGrid(nu);
    setScore(0);
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    CheckWinner(grid);
    CheckOver(grid);
    document.addEventListener("touchstart", startTouch, false);
    document.addEventListener("touchmove", moveTouch, false);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [grid]);

  return (
    <>
      <h3 className="text-center">2048</h3>
      <button
        className="btn btn-primary mx-2"
        onClick={() => setGrid(moveLeft(grid))}
      >
        Left
      </button>
      <button className="btn btn-primary" onClick={() => Reset()}>
        Reset
      </button>
      <h3 className="text-center">Score : {score}</h3>
      <h3 className="text-center">High Score : {high}</h3>
      <div className="main">
        {grid.map((cur, ind) => {
          return (
            <div className="table-row" key={ind}>
              {cur.map((c, ind) => {
                return <TableData value={c} key={ind} reset={Reset} />;
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Grid;
