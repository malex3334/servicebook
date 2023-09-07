import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { v4 as uuidv4 } from "uuid";

export default function NewCarForm() {
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [year, setYear] = useState();
  const [mileage, setMileage] = useState();
  const [img, setImg] = useState();
  const [plates, setPlates] = useState();
  const { addCar } = useContext(DataContext);

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
      object.img =
        "https://media.istockphoto.com/id/120205938/photo/new-car-presentation.jpg?s=612x612&w=0&k=20&c=d8Uy1_rREo_gSwXv2XCdpPf5wK_6UbwWQ5DBAuTYt0g=";
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
          placeholder="brand"
          required
        />
        <input
          type="text"
          placeholder="model"
          onChange={(e) => setModel(e.target.value)}
          value={model}
        />
        <input
          type="year"
          placeholder="year"
          onChange={(e) => setYear(e.target.value)}
          required
          min="1900"
        />
        <input
          type="text"
          placeholder="mileage"
          onChange={(e) => setMileage(e.target.value)}
          value={mileage}
          min="0"
          max="1000000"
        />
        <input
          type="text"
          placeholder="paste img"
          onChange={(e) => setImg(e.target.value)}
          value={img}
        />
        <input
          type="text"
          placeholder="plates"
          onChange={(e) => setPlates(e.target.value)}
          value={plates}
          maxLength="8"
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
