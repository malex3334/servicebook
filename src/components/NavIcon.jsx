import React from "react";

export default function NavIcon(props) {
  const { icon, title } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* <PiInfo className="nav-icon" /> */}
      {icon}
      <span
        style={{
          color: "white",
          fontWeight: "300",
          fontSize: "1.5rem",
          textWrap: "nowrap",
        }}
      >
        {title}
      </span>
    </div>
  );
}
