import React from "react";
import { contentObj } from "../language";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export default function PleaseLogin() {
  const { language } = useContext(DataContext);

  return (
    <div>
      <h2>{contentObj?.[language].loginPage.title}</h2>
      <p>{contentObj?.[language].loginPage.paragraph}</p>
    </div>
  );
}
