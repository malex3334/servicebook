import React, { useRef } from "react";
import { handleImgError } from "../helpers/Helpers";

export default function CarDetails({ car }) {
  const carimg = useRef();
  function handleImgError(e) {
    carimg.current.src =
      "https://media.istockphoto.com/id/120205938/photo/new-car-presentation.jpg?s=612x612&w=0&k=20&c=d8Uy1_rREo_gSwXv2XCdpPf5wK_6UbwWQ5DBAuTYt0g=";

    car.img =
      "https://media.istockphoto.com/id/120205938/photo/new-car-presentation.jpg?s=612x612&w=0&k=20&c=d8Uy1_rREo_gSwXv2XCdpPf5wK_6UbwWQ5DBAuTYt0g=";
  }

  return (
    // <div className="cardetails_container">
    // <div className="cardetails_body">
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
          Current mileage:<span> {car.mileage} km</span>
        </p>
        <p>
          Year:<span> {car.year}</span>
        </p>
        <p>
          Plates:<span> {car.plates}</span>
        </p>
      </div>
    </>
    // </div>
    // </div>
  );
}
