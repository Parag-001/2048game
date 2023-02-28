import React, { useEffect } from "react";

const TableData = ({ value, reset }) => {
  const newval = value === 0 ? "" : value;
  let color = `color-${value}`;
  return (
    <>
      <div className="cell">
        <div className={color}>{newval}</div>
      </div>
    </>
  );
};

export default TableData;
