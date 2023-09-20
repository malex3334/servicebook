import React from "react";
import { useContext } from "react";
import { contentObj } from "../language";
import { DataContext } from "../context/DataContext";
import { NavLink } from "react-router-dom";

export default function Start() {
  const { language, user } = useContext(DataContext);

  return (
    <div className="about_container container">
      <div className="photo_container"></div>

      <div className="text_container">
        <h2>{contentObj?.[language].about.title}</h2>
        <p>{contentObj?.[language].about.paragraph}</p>
        {!user ? (
          <NavLink to="/login">
            <button className="hero_btn" style={{ margin: "2rem 0" }}>
              sprawdź!
            </button>
          </NavLink>
        ) : null}
      </div>
    </div>
  );
}
