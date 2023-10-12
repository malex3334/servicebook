import React from "react";

export default function SingleFilter(props) {
  const { name, checked, onChange } = props;

  return (
    <div className="single_filter">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="">{name}</label>
    </div>
  );
}
