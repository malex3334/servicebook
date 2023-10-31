import React, { useContext, useRef } from "react";
import { DataContext } from "../context/DataContext";
import { contentObj } from "../language";
import { handleImgError } from "../helpers/Helpers";

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
        <h4 style={{ marginLeft: "0" }}>
          {car.brand} {car.model}
        </h4>
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
    </>
  );
}
