import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import PleaseLogin from "../components/PleaseLogin";
import { NavLink } from "react-router-dom";
import CarDetails from "../components/CarDetails";
import NewCarForm from "../components/NewCarForm";
import Loading from "../components/Loading";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { contentObj } from "../language";

export default function MyGarage() {
  const { user, cars, showServices, deleteCar, loading, language } =
    useContext(DataContext);

  const [newCarTab, setNewCarTab] = useState(false);
  const [editedCar, setEditedCar] = useState();

  const onCarEdit = (car) => {
    setNewCarTab(true);
    setEditedCar(car);
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

  if (loading) {
    return <Loading />;
  } else {
    if (user) {
      return (
        <div className="mygarage_container container">
          <h2>{contentObj?.[language].myCars.title}</h2>
          {!newCarTab ? (
            <button
              onClick={() => setNewCarTab(!newCarTab)}
              style={{ marginBottom: "1rem" }}
            >
              {contentObj?.[language].myCars.addButton}
            </button>
          ) : (
            <button
              onClick={() => {
                setNewCarTab(!newCarTab);
                setEditedCar(null);
              }}
            >
              {contentObj?.[language].myCars.closeButton}
            </button>
          )}
          {newCarElement()}
          {cars &&
            cars?.map((car) => {
              return (
                <div
                  style={{
                    display: "flex",
                    margin: "3rem auto",
                    width: "80rem",
                  }}
                >
                  <NavLink
                    key={car.id}
                    onClick={() => {
                      showServices(car.id, car.services);
                    }}
                    className="cardetails_container"
                    to={`/cars/${car.id}`}
                  >
                    <CarDetails car={car} />
                  </NavLink>
                  <div className="buttons">
                    <button
                      className="btn danger"
                      onClick={() => {
                        deleteCar(car.id, car.services);
                      }}
                    >
                      {" "}
                      <FaTrashAlt />
                    </button>
                    <button onClick={() => onCarEdit(car)} className="btn">
                      <FaEdit />
                    </button>
                  </div>
                </div>
              );
            })}
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
