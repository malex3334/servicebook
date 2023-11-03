import React, { useContext, useRef } from "react";
import { DataContext } from "../context/DataContext";
import { contentObj } from "../language";
import { handleImgError } from "../helpers/Helpers";
import {
  RiCarWashingLine,
  RiErrorWarningLine,
  RiFileShield2Line,
  RiRoadsterLine,
} from "react-icons/ri";
import { useState } from "react";
import { PiWarningCircle } from "react-icons/pi";
import { calculateDaysLeft } from "../helpers/Helpers";
import { NavLink } from "react-router-dom";

export default function CarDetails({ car }) {
  const { language } = useContext(DataContext);
  const carimg = useRef();

  return (
    <>
      <img
        onError={(e) => handleImgError(carimg)}
        className="single-car__img"
        src={car.img}
        alt="car"
        ref={carimg}
      />

      <div className="cardetails__text">
        <NavLink to={`/cars/${car.id}`}>
          <h4 style={{ marginLeft: "0" }}>
            {car.brand} {car.model}
          </h4>
        </NavLink>
        <div className="cardetails__primary">
          <p>
            {contentObj?.[language].myCars.mileage}:
            <span> {Number(car.mileage).toLocaleString()} km</span>
          </p>
          <p>
            {contentObj?.[language].myCars.year}:<span> {car.year}</span>
          </p>
          <p>
            {contentObj?.[language].myCars.plates}:
            <span style={{ textTransform: "uppercase" }}> {car.plates}</span>
          </p>
        </div>
        <div className="cardetails__secondary">
          {car.insurance && (
            <div className="reminder" title="koniec ubezpieczenia">
              <RiFileShield2Line
                className="icon"
                style={{ fontSize: "3rem" }}
              />
              {calculateDaysLeft(car?.insurance) < 30 && (
                <PiWarningCircle className="icon_warning" />
              )}
              <span>{calculateDaysLeft(car.insurance) + " dni"}</span>
            </div>
          )}
          {car.inspection && (
            <div className="reminder" title="następny przegląd">
              <RiCarWashingLine className="icon" style={{ fontSize: "3rem" }} />
              {calculateDaysLeft(car?.inspection) < 30 && (
                <PiWarningCircle className="icon_warning" />
              )}
              <span>{calculateDaysLeft(car.inspection) + " dni"}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
