import React, { useContext, useRef } from "react";
import { DataContext } from "../context/DataContext";
import { contentObj } from "../language";

export default function CarDetails({ car }) {
  const { language } = useContext(DataContext);
  const carimg = useRef();
  function handleImgError(e) {
    carimg.current.src =
      "https://media.istockphoto.com/id/120205938/photo/new-car-presentation.jpg?s=612x612&w=0&k=20&c=d8Uy1_rREo_gSwXv2XCdpPf5wK_6UbwWQ5DBAuTYt0g=";

    car.img =
      "https://media.istockphoto.com/id/120205938/photo/new-car-presentation.jpg?s=612x612&w=0&k=20&c=d8Uy1_rREo_gSwXv2XCdpPf5wK_6UbwWQ5DBAuTYt0g=";
  }

  return (
    <>
      <img
        onError={(e) => handleImgError(e)}
        className="single-car__img"
        src={car.img}
        alt="car"
        ref={carimg}
      />
      <div className="cardetails__text">
        <h4>
          {car.brand} {car.model}
        </h4>
        <p>
          {contentObj?.[language].myCars.mileage}:<span> {car.mileage} km</span>
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
