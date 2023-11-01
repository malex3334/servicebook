import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Tips from "./Tips";

export default function Input(props) {
  const { onChange, type, value, name, note, pattern } = props;
  const labelRef = useRef();
  const inputRef = useRef();
  const [showNote, setShowNote] = useState(true);

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

  const noteTimer = (timer) => {
    setTimeout(() => {
      setShowNote(false);
    }, 3000);
  };
  noteTimer(8000);

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
        step={0.1}
        pattern={pattern}
      />
      <label htmlFor="" className="input_label" ref={labelRef}>
        {name}
      </label>
      {note && showNote && <Tips text={note} />}
    </div>
  );
}

Input.defaultProps = {
  pattern: "normal",
};
