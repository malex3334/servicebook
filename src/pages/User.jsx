import React from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { userData } = useContext(DataContext);
  const navigate = useNavigate();
  console.log(userData);

  if (userData) {
    const { name, photoURL, email, carsIDs } = userData;

    return (
      <div className="userdata_container container">
        <div className="userdata_body">
          <img src={photoURL && photoURL} alt="" />
          <h3>{name}</h3>
          <div className="data_container">
            <span>email: </span>
            <span>{email && email}</span>
          </div>
          <div className="data_container">
            <span>cars: </span>
            <span>{carsIDs?.length}</span>
          </div>
        </div>
      </div>
    );
  } else {
    navigate("/login");
  }
}
