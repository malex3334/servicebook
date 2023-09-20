import React from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export default function User() {
  const { userData } = useContext(DataContext);
  console.log(userData);

  if (userData) {
    const { name, photoURL, email, carsIDs } = userData;
    return (
      <div className="userdata_container container">
        <img src={photoURL && photoURL} alt="" />
        <h3>{name}</h3>
        <span>{email && email}</span>
        <span>{carsIDs?.length}</span>
      </div>
    );
  }
}
