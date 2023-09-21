import React from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { noAvatar } from "../helpers/Helpers";
import Loading from "../components/Loading";

export default function User() {
  const { userData, loading } = useContext(DataContext);
  const navigate = useNavigate();
  console.log(userData);

  if (userData) {
    const { name, photoURL, email, carsIDs } = userData;

    if (loading) {
      return <Loading />;
    }

    return (
      <div className="userdata_container container">
        <div className="userdata_body">
          <img
            className="user_avatar"
            src={photoURL ? photoURL : noAvatar}
            alt="user avatar"
          />
          <h3>{name ? name : "Annonymous"}</h3>
          <div className="data_container">
            <span>email: </span>
            <span>{email ? email : "no email"}</span>
          </div>
          <div className="data_container">
            <span>cars: </span>
            <span>{carsIDs ? carsIDs.length : "no cars yet"}</span>
          </div>
        </div>
      </div>
    );
  } else {
    navigate("/login");
  }
}
