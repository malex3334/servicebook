import React, { useEffect, useRef } from "react";

export default function Input(props) {
  const { onChange, type, value, name } = props;
  const labelRef = useRef();
  const inputRef = useRef();

  const handleFocus = () => {
    if (inputRef.current.type === "select") {
      labelRef.current.className = "input_label input focus";
    }
    if (inputRef.current.value === "") {
      labelRef.current.className = "input_label";
    } else {
      labelRef.current.className = "input_label transparent";
    }

    if (inputRef.current.value !== "") {
      labelRef.current.className = "input_label input-focus";
    }
  };

  useEffect(() => {
    handleFocus();
  }, [value]);

  return (
    <div className="input">
      <input
        ref={inputRef}
        onBlur={handleFocus}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        required
        maxLength={type === "number" ? 6 : 120}
        min="0"
        max="1000000"
      />
      <label htmlFor="" className="input_label" ref={labelRef}>
        {name}
      </label>
    </div>
  );
}
