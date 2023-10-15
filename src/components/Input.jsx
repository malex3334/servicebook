import React from "react";

export default function Input(props) {
  const { onChange, type, value, name } = props;

  return (
    <div className="input">
      <input
        type={type}
        // placeholder={name}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        required
        maxLength={type == "number" ? 6 : 120}
        min="0"
        max="1000000"
      />
      <label htmlFor="" className="input_label">
        {name}
      </label>
    </div>
  );
}
