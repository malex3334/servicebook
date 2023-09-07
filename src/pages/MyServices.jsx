import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import PleaseLogin from "../components/PleaseLogin";
import { NavLink } from "react-router-dom";
import CarDetails from "../components/CarDetails";
import NewCarForm from "../components/NewCarForm";
import Loading from "../components/Loading";
import {FaTrashAlt} from 'react-icons/fa'

export default function MyServices() {
  const { user, cars, showServices, filteredServices, deleteCar, loading } =
    useContext(DataContext);

  const [newCarTab, setNewCarTab] = useState(false);

  const newCarElement = function () {
    if (newCarTab) {
      return <NewCarForm />;
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return (
      <div>
        <h2>Garage</h2>
        {!newCarTab ? (
          <button
            onClick={() => setNewCarTab(!newCarTab)}
            style={{ marginBottom: "1rem" }}
          >
            add car
          </button>
        ) : (
          <button onClick={() => setNewCarTab(!newCarTab)}>close tab</button>
        )}
        {newCarElement()}
        {cars &&
          cars?.map((car) => {
            return (
              <div style={{display:'flex', margin:'3rem auto', width:'80rem' }}>
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
                  <button onClick={() => {
            deleteCar(car.id, car.services);
          }}> <FaTrashAlt
         
        /></button>
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
