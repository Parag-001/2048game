import React, { useState } from "react";

const Tic = () => {
  const [val, setVal] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  });
  const [player, setPlayer] = useState(1);
  const addText = (e) => {
    const id = e.target.id;
    if (player === 1) {
      setPlayer(2);
      e.target.textContent = "x";
    } else {
      setPlayer(1);
      e.target.textContent = "o";
    }
    const val = e.target.textContent;
  };
  return (
    <>
      <h3 className="text-center"> Player : {player} is Playing</h3>
      <div className="grid-tic">
        {Object.keys(val).map((c) => {
          return (
            <button
              key={c}
              className="buttontic"
              id={c}
              onClick={(e) => addText(e)}
            ></button>
          );
        })}
      </div>
    </>
  );
};

export default Tic;
