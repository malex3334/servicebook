import React from "react";
import { contentObj } from "../language";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { MdConstruction } from "react-icons/md";

export default function About() {
  const { language } = useContext(DataContext);

  return (
    <div>
      <div className="start_container container">
        <MdConstruction className="start_icon" />
        <div className="start_body">
          <h2>MyCarService</h2>
          <h3>{contentObj?.[language].start.heading}</h3>
          <ul>{contentObj?.[language].start.listHeading}</ul>
          {contentObj?.[language].start.listElements.map((element) => {
            return <li className="list">{element}</li>;
          })}

          <span>{contentObj?.[language].start.ending}</span>
          <span>{contentObj?.[language].start.testingAlert}</span>
        </div>
      </div>
    </div>
  );
}
