import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import PleaseLogin from "../components/PleaseLogin";
import { NavLink } from "react-router-dom";
import CarDetails from "../components/CarDetails.";
import NewCarForm from "../components/NewCarForm";
import Loading from "../components/Loading";

export default function MyServices() {
  const { user, cars, showServices, filteredServices, deleteCar, loading } =
    useContext(DataContext);

  const [newCarTab, setNewCarTab] = useState(false);

  console.log(cars);
  const newCarElement = function () {
    if (newCarTab) {
      return (
        <div>
          <NewCarForm />
        </div>
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return (
      <div>
        <h2>Your cars:</h2>
        <button
          onClick={() => setNewCarTab(!newCarTab)}
          style={{ marginBottom: "1rem" }}
        >
          add car
        </button>
        {newCarElement()}
        {cars &&
          cars?.map((car) => {
            return (
              <div
                key={car.id}
                onClick={() => {
                  showServices(car.id, car.services);
                }}
              >
                <button
                  onClick={() => {
                    deleteCar(car.id, car.services);
                  }}
                >
                  delete car
                </button>
                <NavLink to={`/cars/${car.id}`}>
                  <CarDetails car={car} />
                </NavLink>
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
