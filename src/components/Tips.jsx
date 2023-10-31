import React from "react";
import { useState } from "react";

export default function Tips({ text }) {
  const [closeTip, setCloseTip] = useState(false);

  const noteStyle = {
    position: "absolute",
    bottom: "-30%",
    left: "30%",
    fontSize: "1.25rem",
    background: "white",
    padding: ".75rem",
    paddingRight: "2.5em",
    textWrap: "nowrap",
    boxShadow: "0px 0px 5px rgba(64,64,64,0.5)",
    borderRadius: "3px",
    color: "#404040",
    zIndex: "999",
  };

  const x = {
    position: "absolute",
    right: ".5em",
    bottom: "60%",
    transform: "translateY(50%)",
    fontSize: "2rem",
    fontWeight: "bold",
    cursor: "pointer",
    color: "crimson",
  };

  if (!closeTip) {
    return (
      <div style={noteStyle}>
        <span onClick={() => setCloseTip(true)} style={x}>
          x
        </span>
        <span style={{ fontSize: "1.5rem" }}>{text}</span>
      </div>
    );
  }
}
