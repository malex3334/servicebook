import React, { useContext, useRef } from "react";
import { handleImgError } from "../helpers/Helpers";
import { DataContext } from "../context/DataContext";
import { FaTrashAlt } from "react-icons/fa";
import { noImg } from "../helpers/Helpers";

export default function CarDetails({ car }) {
  const { deleteCar } = useContext(DataContext);
  const carimg = useRef();
  function handleImgError(e) {
    carimg.current.src = noImg;

    car.img = noImg;
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
      <button>
        <FaTrashAlt
          onClick={() => {
            deleteCar(car.id, car.services);
          }}
        />
      </button>
    </>
    // </div>
    // </div>
  );
}
