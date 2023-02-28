import React from "react";

const Display = ({ data }) => {
  return (
    <>
      {data.map((c, ind) => {
        return (
          <div className="cell" key={ind}>
            <div>{c === 0 ? "" : c}</div>
          </div>
        );
      })}
    </>
  );
};

export default Display;
