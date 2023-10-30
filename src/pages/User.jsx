import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { noAvatar } from "../helpers/Helpers";
import { FaEdit, FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Loading from "../components/Loading";
import Input from "../components/Input";
import ChangePasswordForm from "../components/Login/ChangePasswordForm";

export default function User() {
  const [edit, setEdit] = useState(false);
  const { userData, loading, editUserData } = useContext(DataContext);
  const [editedName, setEditedName] = useState(userData?.name);
  const [editedImg, setEditedImg] = useState(userData?.photoURL);
  const [passwordChangeInput, setPasswordChangeInput] = useState();
  const navigate = useNavigate();

  const onHandleSubmit = (userID, editedData, editedParam) => {
    editUserData(userID, editedData, editedParam);
  };

  const handleShowPasswordForm = () => {
    setPasswordChangeInput(true);
  };

  const handleCancel = () => {
    setPasswordChangeInput(false);
  };

  useEffect(() => {}, [userData?.name, userData?.photoURL, editedImg, setEdit]);

  if (loading) {
    return <Loading />;
  }

  if (userData) {
    const { name, photoURL, email, carsIDs, id } = userData;

    return (
      <div className="userdata_container container">
        <div className="userdata_body">
          <h2>Twoje dane</h2>
          {edit ? (
            <div className="name_container">
              <Input
                type="text"
                value={editedImg}
                onChange={setEditedImg}
                name="avatar"
              />

              <div className="buttons">
                <button type="submit" className="nobutton">
                  <FaCheck
                    onClick={(e) => {
                      setEdit(false);
                      onHandleSubmit(id, editedImg, "photoURL");
                    }}
                    className="icon success"
                  />
                </button>
                <button type="submit" className="nobutton">
                  <FaXmark
                    onClick={(e) => {
                      setEdit(false);
                    }}
                    className="icon danger"
                  />
                </button>
              </div>
            </div>
          ) : null}
          <img
            className="user_avatar"
            src={photoURL ? photoURL : noAvatar}
            alt="user avatar"
            onError={(e) =>
              (e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png")
            }
          />
          {edit ? (
            <div className="name_container">
              <Input
                type="text"
                value={editedName}
                onChange={setEditedName}
                name="imię"
              />

              <div className="buttons">
                <button type="submit" className="nobutton">
                  <FaCheck
                    onClick={(e) => {
                      setEdit(false);
                      onHandleSubmit(id, editedName, "name");
                    }}
                    className="icon success"
                  />
                </button>
                <button type="submit" className="nobutton">
                  <FaXmark
                    onClick={(e) => {
                      setEdit(false);
                      setEditedName(name);
                    }}
                    className="icon danger"
                  />
                </button>
              </div>
            </div>
          ) : (
            <div className="name_container">
              <h3>{userData?.name ? userData?.name : "Annonymous"}</h3>
              <button className="nobutton">
                <FaEdit
                  onClick={() => {
                    setEdit(true);
                  }}
                  className="icon"
                />
              </button>
            </div>
          )}
          <div className="data_container">
            <span className="bold">email: </span>
            <span>{email ? email : "no email"}</span>
          </div>
          <div className="data_container">
            <span className="bold">cars: </span>
            <span>{carsIDs ? carsIDs.length : "no cars yet"}</span>
          </div>

          {passwordChangeInput ? (
            <ChangePasswordForm handleCancel={handleCancel} />
          ) : (
            <div>
              <button onClick={handleShowPasswordForm}>zmień hasło</button>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    navigate("/login");
  }
}
