import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { v4 as uuidv4 } from "uuid";
import { noImg } from "../helpers/Helpers.jsx";
import { contentObj } from "../language";
import { useEffect } from "react";
import {Input} from "./Input.jsx"

export default function NewCarForm({ editedCar, setNewCarTab, setEditedCar }) {
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [year, setYear] = useState();
  const [mileage, setMileage] = useState();
  const [img, setImg] = useState();
  const [plates, setPlates] = useState();
  const [services, setServices] = useState();
  const { addCar, language, editCarData } = useContext(DataContext);

  const clearInputs = () => {
    setBrand("");
    setModel("");
    setImg("");
    setMileage("");
    setYear("");
    setPlates("");
  };

  const carObject = {
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
  const editedCarObject = {
    id: editedCar?.id,
    brand,
    model,
    img,
    createdAt: "data",
    services: editedCar?.services,
    mileage,
    year,
    plates,
  };

  const onSubmit = (e, object) => {
    e.preventDefault();

    setNewCarTab(false);

    if (object.img == undefined) {
      object.img = noImg;
    }

    if (editedCar != null) {
      editCarData(e, editedCarObject);
      // clearInputs()
    } else {
      addCar(e, object);
      clearInputs();
    }
    clearInputs();
    setEditedCar(null);
  };

  useEffect(() => {
    if (editedCar != null) {
      setBrand(editedCar.brand);
      setModel(editedCar.model);
      setImg(editedCar.img);
      setMileage(editedCar.mileage);
      setYear(editedCar.year);
      setPlates(editedCar.plates);
    }
  }, [editedCar]);

  return (
    <div className="newcar_container">
      <form
        onSubmit={(e) => {
          onSubmit(e, carObject);
        }}
        action=""
      >
      <Input type="text" onChange={setBrand} value={brand} maxLength={12} name={contentObj?.[language].myCars.brand} />
        {/* <input
          type="text"
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
          placeholder={contentObj?.[language].myCars.brand}
          required
          maxLength={12}
        /> */}
        <Input type="text" onChange={setModel} value={model} maxLength={15} name={contentObj?.[language].myCars.model} />
        {/* <input
          type="text"
          placeholder={contentObj?.[language].myCars.model}
          onChange={(e) => setModel(e.target.value)}
          value={model}
          maxLength={15}
        /> */}
        <Input type="text" onChange={setYear} value={year} maxLength={4} name={contentObj?.[language].myCars.year} />

        {/* <input
          type="year"
          placeholder={contentObj?.[language].myCars.year}
          onChange={(e) => setYear(e.target.value)}
          required
          min="1900"
          value={year}
          maxLength={4}
        /> */}

        <Input type="number" onChange={setMileage} value={mileage} maxLength={6} name={contentObj?.[language].myCars.mileage} />

        {/* <input
          type="number"
          placeholder={contentObj?.[language].myCars.mileage}
          onChange={(e) => setMileage(e.target.value)}
          value={mileage}
          min="0"
          max="1000000"
          maxLength={6}
        /> */}

<Input type="text" onChange={setImg} value={img}  name={contentObj?.[language].myCars.img} />

        {/* <input
          type="text"
          placeholder={contentObj?.[language].myCars.img}
          onChange={(e) => setImg(e.target.value)}
          value={img}
        /> */}

<Input type="text" onChange={setPlates} value={plates} maxLength={8} name={contentObj?.[language].myCars.plates} />

        {/* <input
          type="text"
          placeholder={contentObj?.[language].myCars.plates}
          onChange={(e) => setPlates(e.target.value)}
          value={plates}
          maxLength="8"
        /> */}

        <button type="submit">
          {editedCar == null
            ? contentObj?.[language].myCars.submit
            : contentObj?.[language].myCars.update}
        </button>
      </form>
    </div>
  );
}
