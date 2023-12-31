import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useParams } from "react-router-dom";
import { getCurrentDate } from "../../helpers/Helpers";
import { v4 as uuidv4 } from "uuid";
import { cash } from "../../helpers/Helpers";
import { contentObj } from "../../language";
import Input from "../Input";

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
    <form
      action=""
      onSubmit={(e) => {
        onSubmit(e, serviceObject);
      }}>
      <div className="newservice_container">
        <h4 className="filters_header">Serwis</h4>
        <div>
          <div className="serviceform_container">
            <Input
              type="text"
              onChange={setTitle}
              value={title}
              name={contentObj?.[language].services.title}
            />
            <Input
              type="date"
              onChange={setDate}
              value={date}
              name={contentObj?.[language].services.date}
            />
            <Input
              type="text"
              onChange={setDescription}
              value={description}
              name={contentObj?.[language].services.desc}
            />

            <div className="input">
              <select
                onChange={(e) => setCategory(e.target.value)}
                name="category"
                id="category"
                value={category}>
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
              <label htmlFor="" className="input_label input-focus">
                kategoria
              </label>
            </div>

            <Input
              type="number"
              onChange={setMileage}
              value={mileage?.toLocaleString()}
              name={contentObj?.[language].services.mileage}
              pattern="[0-9]*"
            />
            <Input
              type="number"
              onChange={setPrice}
              value={cash(price)}
              name={contentObj?.[language].services.price}
              pattern="[0-9]*"
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => setDone(!done)}>
              <input
                type="checkbox"
                checked={done}
                onChange={() => setDone(!done)}
              />
              <label htmlFor="">zrobione</label>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons_container">
        <button type="submit">
          {!editFlag ? contentObj?.[language].services.addButton : "aktualizuj"}
        </button>
        {editFlag === true && (
          <button
            type="submit"
            style={{ margin: "0 1rem" }}
            onClick={() => {
              onEditCancel();
            }}>
            anuluj
          </button>
        )}
      </div>
    </form>
  );
}
