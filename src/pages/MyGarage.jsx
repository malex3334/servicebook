import React, { useContext, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import { NavLink } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaInfo, FaSearch } from "react-icons/fa";
import { contentObj } from "../language";
import { scrollToElement } from "../helpers/Helpers";
import PleaseLogin from "../components/PleaseLogin";
import CarDetails from "../components/CarDetails";
import NewCarForm from "../components/Forms/NewCarForm";
import Loading from "../components/Loading";
import ConfirmEmail from "../components/Login/ConfirmEmail";

export default function MyGarage() {
  const { user, cars, showServices, deleteCar, loading, language } =
    useContext(DataContext);

  const [newCarTab, setNewCarTab] = useState(false);
  const [editedCar, setEditedCar] = useState();
  const scrollRef = useRef(null);

  const onCarEdit = (car) => {
    setNewCarTab(true);
    setEditedCar(car);
    scrollToElement(scrollRef);
  };

  const newCarElement = function () {
    if (newCarTab) {
      return (
        <NewCarForm
          editedCar={editedCar}
          setEditedCar={setEditedCar}
          setNewCarTab={setNewCarTab}
        />
      );
    }
  };

  console.log(cars);

  if (!user) {
    return <PleaseLogin />;
  }

  if (!user?.emailVerified) {
    return <ConfirmEmail />;
  }

  if (loading) {
    return <Loading />;
  } else {
    if (user) {
      return (
        <div className="mygarage_container container" ref={scrollRef}>
          <h2>{contentObj?.[language].myCars.title}</h2>
          {!newCarTab ? (
            <button
              onClick={() => setNewCarTab(!newCarTab)}
              style={{ marginBottom: "1rem" }}>
              {contentObj?.[language].myCars.addButton}
            </button>
          ) : (
            <button
              onClick={() => {
                setNewCarTab(!newCarTab);
                setEditedCar(null);
              }}>
              {contentObj?.[language].myCars.closeButton}
            </button>
          )}
          {newCarElement()}
          <div className="cars_container">
            {cars &&
              cars?.map((car) => {
                return (
                  <div className="singlecar_container" key={car.id}>
                    <div
                      key={car.id}
                      className="cardetails_container"
                      // to={`/cars/${car.id}`}
                    >
                      <CarDetails car={car} />
                    </div>
                    <div className="buttons" title="usuń">
                      <button
                        className="btn danger"
                        onClick={() => {
                          setNewCarTab(false);
                          setEditedCar(null);
                          deleteCar(car.id, car.services);
                        }}>
                        {" "}
                        <FaTrashAlt />
                      </button>
                      <button
                        onClick={() => onCarEdit(car)}
                        className="btn"
                        title="edytuj">
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => alert("funkcja w trakcie dodawania")}
                        className="btn"
                        title="więcej informacji">
                        <FaInfo />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      );
    } else
      return (
        <div>
          <PleaseLogin />
        </div>
      );
  }
}
