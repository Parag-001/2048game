import React, { useEffect, useMemo, useState } from "react";
import Display from "./Display";
const Gridd = () => {
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const ganerateGrid = () => {
    return new Array(4).fill(null).map(() => new Array(4).fill(0));
  };

  const Random = () => {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    return [row, col];
  };
  const createRandom = (NewGrid, flag) => {
    let [row, col] = Random();
    while (NewGrid[row][col] !== 0) {
      [row, col] = Random();
    }
    if (flag) {
      createRandom(grid);
    }
    NewGrid[row][col] = 2;
    return NewGrid;
  };
  useMemo(() => {
    return createRandom(grid, true);
  }, []);

  const LeftSide = (grid) => {
    const Newgrid = ganerateGrid();
    for (let i = 0; i < grid.length; i++) {
      let col = 0;
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] !== 0) {
          Newgrid[i][col] = grid[i][j];
          col++;
        }
      }
    }
    return Newgrid;
  };
  const Merge = (grid) => {
    const NewGrid = ganerateGrid();
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length - 1; j++) {
        if (grid[i][j] > 0 && grid[i][j] === grid[i][j + 1]) {
          grid[i][j] = grid[i][j] * 2;
          grid[i][j + 1] = 0;
        }
      }
    }
    return [NewGrid];
  };
  const LeftMove = (grid) => {
    const sideLeft = LeftSide(grid);
    const [merge] = Merge(sideLeft);
    const secLeft = LeftSide(merge);
    return createRandom(secLeft);
  };
  const onKeyFun = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        setGrid(LeftMove(grid));
        break;
      case "ArrowRight":
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", onKeyFun);
    return () => {
      window.removeEventListener("keydown", onKeyFun);
    };
  });
  return (
    <>
      <div className="main-div">
        {grid.map((c, ind) => {
          return <Display data={c} key={ind} />;
        })}
      </div>
    </>
  );
};

export default Gridd;
