import React, { useEffect, useState } from "react";

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
  useEffect(() => {
    CheckWinner();
  }, [val]);
  const [player, setPlayer] = useState(1);
  const addText = (e) => {
    const id = e.target.id;
    if (player === 1) {
      setPlayer(2);
      e.target.textContent = "x";
      setVal({ ...val, [id]: e.target.textContent });
      e.target.disabled = true;
    } else {
      setPlayer(1);
      e.target.textContent = "o";
      setVal({ ...val, [id]: e.target.textContent });
      e.target.disabled = true;
    }
  };
  const Reset = () => {
    setVal({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" });
  };
  const CheckWinner = () => {
    if (
      (val[1] !== "" && val[1] === val[2] && val[2] === val[3]) ||
      (val[1] !== "" && val[1] === val[4] && val[4] === val[7]) ||
      (val[1] !== "" && val[1] === val[5] && val[5] === val[9]) ||
      (val[3] !== "" && val[3] === val[6] && val[6] === val[9]) ||
      (val[2] !== "" && val[2] === val[5] && val[5] === val[8]) ||
      (val[4] !== "" && val[4] === val[5] && val[5] === val[6]) ||
      (val[7] !== "" && val[7] === val[8] && val[8] === val[9]) ||
      (val[3] !== "" && val[3] === val[5] && val[5] === val[7])
    ) {
      if (player === 1) {
        alert("Player " + 2 + " Is Won");
        Reset();
      } else {
        alert("Player " + 1 + " Is Won");
        Reset();
      }
    }
  };

  return (
    <>
      <h3 className="text-center"> Player : {player} is Playing</h3>
      <h3 className="text-center">
        {`Symbol is : ${player === 1 ? `x` : `o`}`}
      </h3>
      <div className="grid-tic">
        {Object.keys(val).map((c) => {
          return (
            <button
              key={c}
              className="buttontic"
              id={c}
              disabled={false}
              onClick={(e) => addText(e)}
            >
              {val[c]}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Tic;
