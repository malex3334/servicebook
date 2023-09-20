import React from "react";
import { useContext } from "react";
import { contentObj } from "../language";
import { DataContext } from "../context/DataContext";

export default function Start() {
  const { language } = useContext(DataContext);

  return (
    <div className="about_container container">
      <div className="photo_container"></div>

      <div className="text_container">
        <h2>{contentObj?.[language].about.title}</h2>
        <p>{contentObj?.[language].about.paragraph}</p>
      </div>
    </div>
  );
}
