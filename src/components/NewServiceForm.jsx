import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useParams } from "react-router-dom";
import { getCurrentDate } from "../helpers/Helpers";
import { v4 as uuidv4 } from "uuid";
import { cash } from "../helpers/Helpers";
import { contentObj } from "../language";

export default function NewServiceForm() {
  const { addService, cars, language } = useContext(DataContext);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState(
    cars && cars.filter((car) => car.id === id)[0]?.mileage
  );
  const [date, setDate] = useState(getCurrentDate());
  const serviceObject = {
    id: uuidv4(),
    title: title,
    date: date,
    desc: description,
    createdAt: getCurrentDate(),
    mileage: mileage,
    price: price,
  };

  return (
    <div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault(e);
          addService(serviceObject, id);
        }}
      >
        <input
          type="text"
          placeholder={contentObj?.[language].services.title}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        <input
          type="date"
          placeholder={contentObj?.[language].services.date}
          onChange={(e) => setDate(e.target.value)}
          value={date}
          required
        />
        <input
          type="text"
          placeholder={contentObj?.[language].services.desc}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
        <input
          type="number"
          placeholder={contentObj?.[language].services.mileage}
          onChange={(e) => setMileage(e.target.value)}
          value={mileage?.toLocaleString()}
          maxLength="6"
          min="0"
          max="1000000"
        />
        <input
          type="number"
          placeholder={contentObj?.[language].services.price}
          min="0"
          onChange={(e) => setPrice(e.target.value)}
          value={cash(price)}
        />
        <button type="submit">
          {contentObj?.[language].services.addButton}
        </button>
      </form>
    </div>
  );
}
