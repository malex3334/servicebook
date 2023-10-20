import React from "react";
import { contentObj } from "../language";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { NavLink } from "react-router-dom";

export default function PleaseLogin() {
  const { language } = useContext(DataContext);

  return (
    <div className="container">
      <h2>{contentObj?.[language].loginPage.title}</h2>
      <p>{contentObj?.[language].loginPage.paragraph}</p>
      <NavLink to="/login">
        <button className="hero_btn" style={{ margin: "2rem 0" }}>
          {contentObj?.[language].loginPage.title}
        </button>
      </NavLink>
    </div>
  );
}
