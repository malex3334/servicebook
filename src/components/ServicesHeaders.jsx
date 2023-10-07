import React from "react";
import { NavLink } from "react-router-dom";

export default function ServicesHeaders({
  header,
  id,
  setSorting,
  setCount,
  count,
}) {
  const handleOnClick = (e) => {
    setCount((prev) => prev + 1);
    setSorting(e.target.id);
  };

  const sortingIcon = () => {
    if (count % 2) {
      return " dw";
    } else return " up";
  };

  return (
    <th
      style={{ cursor: "pointer" }}
      id={id}
      onClick={(e) => {
        handleOnClick(e);
      }}
    >
      {header}
      {/* <span>{sortingIcon()}</span> */}
    </th>
  );
}
