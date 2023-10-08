import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";

export default function ServicesHeaders({
  header,
  id,
  setSorting,
  setCount,
  count,
}) {
  const [activeElement, setActiveElement] = useState(null);

  const handleOnClick = (e) => {
    setCount((prev) => prev + 1);
    setSorting(e.target.id);
    setActiveElement(e.target.id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.className.includes("table_header")) {
      } else {
        if (event.target.id !== id) {
          setActiveElement(null);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [id]);

  const sortingIcon = () => {
    if (activeElement === id && count % 2) {
      return <FaSortUp className="sort_icon" />;
    } else if (activeElement === id && !(count % 2)) {
      return <FaSortDown className="sort_icon" />;
    } else {
      return <FaSort className="sort_icon" />;
    }
  };

  return (
    <th
      className={`table_header ${activeElement === id ? "active" : ""}`}
      style={{ cursor: "pointer" }}
      id={id}
      onClick={handleOnClick}
    >
      <>{header}</>
      <span>{sortingIcon()}</span>
    </th>
  );
}
