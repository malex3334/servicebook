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
import { auth } from "../utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";

export default function User() {
  const [edit, setEdit] = useState(false);
  const [avatarEdit, setAvatarEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const { userData, loading, editUserData } = useContext(DataContext);
  const [editedName, setEditedName] = useState(userData?.name);
  const [editedImg, setEditedImg] = useState(userData?.photoURL);
  const [passwordChangeInput, setPasswordChangeInput] = useState();
  const navigate = useNavigate();
  const { user } = useContext(DataContext);

  const onHandleSubmit = (userID, editedData, editedParam) => {
    editUserData(userID, editedData, editedParam);
  };

  const handleShowPasswordForm = () => {
    setPasswordChangeInput(true);
  };

  const handleCancel = () => {
    setPasswordChangeInput(false);
  };

  const handlePasswordReset = () => {
    let result = window.confirm("are you sure?");

    if (result) {
      console.log(auth, user?.email);
      try {
        sendPasswordResetEmail(auth, user?.email);
        toast.success("email send");
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    }
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
          {avatarEdit ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAvatarEdit(false);
                onHandleSubmit(id, editedImg, "photoURL");
              }}
            >
              <div className="name_container">
                <Input
                  type="text"
                  value={editedImg}
                  onChange={setEditedImg}
                  name="avatar"
                />

                <div className="buttons">
                  <button type="submit" className="nobutton">
                    <FaCheck className="icon success" />
                  </button>
                  <button type="submit" className="nobutton">
                    <FaXmark
                      onClick={(e) => {
                        setAvatarEdit(false);
                      }}
                      className="icon danger"
                    />
                  </button>
                </div>
              </div>
            </form>
          ) : null}
          <div style={{ position: "relative" }}>
            <img
              className="user_avatar"
              src={photoURL ? photoURL : noAvatar}
              alt="user avatar"
              onClick={() => setAvatarEdit(true)}
              onError={(e) =>
                (e.target.src =
                  "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png")
              }
            />
            <button
              style={{
                position: "absolute",
                right: "1rem",
                top: "1rem",
                background: "none",
              }}
              className="nobutton"
            >
              {!avatarEdit ? (
                <FaEdit
                  onClick={() => {
                    setAvatarEdit(true);
                  }}
                  className="icon"
                />
              ) : (
                ""
              )}
            </button>
          </div>
          {nameEdit ? (
            <div className="name_container">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNameEdit(false);
                  onHandleSubmit(id, editedName, "name");
                }}
                action=""
              >
                <Input
                  type="text"
                  value={editedName}
                  onChange={setEditedName}
                  name="imię"
                />

                <div className="buttons">
                  <button type="submit" className="nobutton">
                    <FaCheck className="icon success" />
                  </button>
                  <button type="submit" className="nobutton">
                    <FaXmark
                      onClick={(e) => {
                        setNameEdit(false);
                        setEditedName(name);
                      }}
                      className="icon danger"
                    />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="name_container">
              <h3>{userData?.name ? userData?.name : "Annonymous"}</h3>
              <button className="nobutton">
                <FaEdit
                  onClick={() => {
                    setNameEdit(true);
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
          <h6 style={{ margin: "1rem 0" }}>ustawienia:</h6>
          {passwordChangeInput ? (
            <ChangePasswordForm handleCancel={handleCancel} />
          ) : (
            <div className="account_settings">
              <button onClick={handleShowPasswordForm}>zmień hasło</button>
            </div>
          )}
          <button className="account_settings" onClick={handlePasswordReset}>
            zresetuj hasło
          </button>
          <button className="account_settings">usuń konto</button>
        </div>
      </div>
    );
  } else {
    navigate("/login");
  }
}
