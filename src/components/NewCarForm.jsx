import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { v4 as uuidv4 } from "uuid";
import { imgWarning, noImg } from "../helpers/Helpers.jsx";
import { contentObj } from "../language";
import { useEffect } from "react";
import Input from "./Input";

export default function NewCarForm({ editedCar, setNewCarTab, setEditedCar }) {
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [year, setYear] = useState();
  const [mileage, setMileage] = useState();
  const [img, setImg] = useState();
  const [plates, setPlates] = useState();
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
        action="">
        <div className="serviceform_container">
          <Input
            type="text"
            onChange={setBrand}
            value={brand}
            maxLength={12}
            name={contentObj?.[language].myCars.brand}
          />

          <Input
            type="text"
            onChange={setModel}
            value={model}
            maxLength={15}
            name={contentObj?.[language].myCars.model}
          />

          <Input
            type="text"
            onChange={setYear}
            value={year}
            maxLength={4}
            name={contentObj?.[language].myCars.year}
          />

          <Input
            type="number"
            onChange={setMileage}
            value={mileage}
            maxLength={6}
            name={contentObj?.[language].myCars.mileage}
          />

          <Input
            type="text"
            onChange={setImg}
            value={img}
            name={contentObj?.[language].myCars.img}
            note={imgWarning}
          />

          <Input
            type="text"
            onChange={setPlates}
            value={plates}
            maxLength={8}
            name={contentObj?.[language].myCars.plates}
          />

          <button type="submit">
            {editedCar == null
              ? contentObj?.[language].myCars.submit
              : contentObj?.[language].myCars.update}
          </button>
        </div>
      </form>
    </div>
  );
}
