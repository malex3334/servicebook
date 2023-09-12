import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { v4 as uuidv4 } from "uuid";
import { noImg } from "../helpers/Helpers.jsx";
import { contentObj } from "../language";

export default function NewCarForm() {
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [year, setYear] = useState();
  const [mileage, setMileage] = useState();
  const [img, setImg] = useState();
  const [plates, setPlates] = useState();
  const { addCar, language } = useContext(DataContext);

  console.log(contentObj, language);

  const carObject = {
    // id:
    id: uuidv4(),
    brand,
    model,
    img,
    createdAt: "data",
    services: [],
    mileage,
    year,
    plates,
  };

  const onSubmit = (e, object) => {
    e.preventDefault();
    console.log(object);
    if (object.img == undefined) {
      object.img = noImg;
    }

    addCar(e, object);
  };

  return (
    <div className="newcar_container">
      {/* <form onSubmit={(e) => addCar(e, carObject)} action=""> */}
      <form onSubmit={(e) => onSubmit(e, carObject)} action="">
        <input
          type="text"
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
          placeholder={contentObj?.[language].myCars.brand}
          required
        />
        <input
          type="text"
          placeholder={contentObj?.[language].myCars.model}
          onChange={(e) => setModel(e.target.value)}
          value={model}
        />
        <input
          type="year"
          placeholder={contentObj?.[language].myCars.year}
          onChange={(e) => setYear(e.target.value)}
          required
          min="1900"
        />
        <input
          type="text"
          placeholder={contentObj?.[language].myCars.mileage}
          onChange={(e) => setMileage(e.target.value)}
          value={mileage}
          min="0"
          max="1000000"
        />
        <input
          type="text"
          placeholder={contentObj?.[language].myCars.img}
          onChange={(e) => setImg(e.target.value)}
          value={img}
        />
        <input
          type="text"
          placeholder={contentObj?.[language].myCars.plates}
          onChange={(e) => setPlates(e.target.value)}
          value={plates}
          maxLength="8"
        />
        <button type="submit">{contentObj?.[language].myCars.submit}</button>
      </form>
    </div>
  );
}
