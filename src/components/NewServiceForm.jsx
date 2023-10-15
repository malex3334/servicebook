import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useParams } from "react-router-dom";
import { getCurrentDate } from "../helpers/Helpers";
import { v4 as uuidv4 } from "uuid";
import { cash } from "../helpers/Helpers";
import { contentObj } from "../language";

export default function NewServiceForm({ editedService, setEditedService }) {
  const { addService, cars, language, editedServiceData } =
    useContext(DataContext);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("maintenance");
  const [mileage, setMileage] = useState(
    cars && cars.filter((car) => car.id === id)[0]?.mileage
  );
  const titleRef = useRef(null);
  const [done, setDone] = useState(true);
  const [editFlag, setEditFlag] = useState(false);

  const [lastMileage, setLastMileage] = useState("");
  const [lastDate, setLastDate] = useState("");

  const clearInputs = () => {
    setTitle("");
    setDate(getCurrentDate());
    setDescription("");
    setMileage("");
    setPrice("");
    setCategory("");
    setCategory("maintenance");
    setDone(true);
  };

  const [date, setDate] = useState(getCurrentDate());

  const serviceObject = {
    id: uuidv4(),
    title: title,
    date: date,
    desc: description,
    createdAt: getCurrentDate(),
    mileage: mileage,
    price: price,
    category: category,
    done: done,
  };

  const onEditCancel = () => {
    setEditFlag(false);
    setEditedService(null);
    editedService = null;
    clearInputs();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (editFlag === true) {
      editedServiceData(e, editedServiceObject);
      setEditedService(null);
      editedService = null;
      setEditFlag(false);
      clearInputs();
    } else {
      addService(serviceObject, id);
      clearInputs();
      titleRef.current.focus();
    }
  };
  useEffect(() => {
    if (editedService != null) {
      setEditFlag(true);
      setTitle(editedService.title);
      setDate(editedService.date);
      setDescription(editedService.desc);
      setMileage(editedService.mileage.toString());
      setPrice(editedService.price.toString());
      setDone(editedService.done);
      setCategory(editedService.category);
      if (editedService?.category === undefined) {
        setCategory("maintenance");
      }
      if (editedService?.done === undefined) {
        // setDone(true);
      }
    }
  }, [editedService]);

  const editedServiceObject = {
    id: editedService?.id,
    title: title,
    date: date,
    desc: description,
    createdAt: getCurrentDate(),
    mileage: mileage,
    price: price,
    category: category,
    done: done,
  };

  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          onSubmit(e, serviceObject);
        }}
      >
        <div className="serviceform_container">
          <input
            ref={titleRef}
            type="text"
            placeholder={contentObj?.[language].services.title}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            maxLength={40}
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
            maxLength={120}
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id="category"
            value={category}
          >
            <option value="maintenance">
              {contentObj?.[language].services.categories.maintenance}
            </option>
            <option value="fix">
              {contentObj?.[language].services.categories.fix}
            </option>
            <option value="aesthetics">
              {contentObj?.[language].services.categories.aesthetics}
            </option>
          </select>

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => setDone(!done)}
          >
            <input
              type="checkbox"
              checked={done}
              onChange={() => setDone(!done)}
            />
            <label htmlFor="">zrobione</label>
          </div>
        </div>
        <button type="submit">
          {!editFlag ? contentObj?.[language].services.addButton : "aktualizuj"}
        </button>
        {editFlag === true && (
          <button
            type="button"
            style={{ margin: "0 1rem" }}
            onClick={() => {
              onEditCancel();
            }}
          >
            anuluj
          </button>
        )}
      </form>
    </>
  );
}
