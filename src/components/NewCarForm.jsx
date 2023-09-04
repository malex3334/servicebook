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

  return (
    <div>
      <form onSubmit={(e) => addCar(e, carObject)} action="">
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
        />
        <input
          type="text"
          placeholder="mileage"
          onChange={(e) => setMileage(e.target.value)}
          value={mileage}
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
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
