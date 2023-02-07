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
  let high = localStorage.getItem("HighScore") || 0;

  if (score > high) {
    localStorage.setItem("HighScore", score);
  }

  const hasValue = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          return true;
        }
      }
    }
    return false;
  };
  const isFull = (board) => {
    return !hasValue(board);
  };

  const randomPosition = () => {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    return [row, col];
  };

  const generateRandom = (grid) => {
    if (isFull(grid)) {
      alert("Game Is Over");
      return grid;
    }

    let [row, col] = randomPosition();
    while (grid[row][col] !== 0) {
      [row, col] = randomPosition();
    }

    grid[row][col] = 2;
    return grid;
  };

  useMemo(() => {
    return generateRandom(grid);
  }, []);
  // useEffect(() => {
  //   generateRandom(grid);
  // }, [grid]);

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

  const rotateLeft = (board) => {
    let newBoard = generateBoard();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        newBoard[i][j] = board[j][board.length - 1 - i];
      }
    }
    return newBoard;
  };
  const rotateRight = (board) => {
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
  const sideRight = (board) => {
    let newGrid = generateBoard();
    for (let i = 0; i < board.length; i++) {
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
  const moveLeft = (board) => {
    const nBoard1 = sideLeft(board);
    const [nBoard2] = merge(nBoard1);
    const nBoard3 = sideLeft(nBoard2);
    return generateRandom(nBoard3);
  };

  const moveRight = (board) => {
    const nBoard1 = sideRight(board);
    const [nBoard2] = merge(nBoard1);
    const nBoard3 = sideRight(nBoard2);
    return generateRandom(nBoard3);
  };
  const moveUp = (board) => {
    const nBoard = rotateLeft(board);
    const nBoard2 = moveLeft(nBoard);
    const res = rotateRight(nBoard2);
    return res;
  };
  const moveDown = (board) => {
    const nBoard = rotateRight(board);
    const nBoard2 = moveLeft(nBoard);
    const res = rotateLeft(nBoard2);
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
    const nu = generateRandom(a);
    setGrid(nu);
    setScore(0);
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

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
      <h3 className="text-center">Score Is : {score}</h3>
      <h3 className="text-center">High Score Is : {high}</h3>

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
