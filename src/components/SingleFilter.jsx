import React from "react";
import { contentObj } from "../language";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export default function SingleFilter(props) {
  const { name, checked, onChange } = props;
  const { language } = useContext(DataContext);

  return (
    <div className="single_filter">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <clabel htmlFor="">
        {contentObj?.[language].services.filters[name]}
      </clabel>
    </div>
  );
}
