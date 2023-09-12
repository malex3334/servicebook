import React, { useContext, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { uuidv4 } from "@firebase/util";
import { ClimbingBoxLoader } from "react-spinners";
import { contentObj } from "../language";

export default function Login() {
  const { user, language } = useContext(DataContext);
  const [email, setEmail] = useState("test@test.pl");
  const [password, setPassword] = useState("testingpass");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarLink, setAvatarLink] = useState("");

  const newUserObject = {
    displayName: name,
    email,
    password,
    avatarLink,
    id: uuidv4(),
  };

  const navigate = useNavigate();
  // sign in with google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      console.log("password error");
      return;
    } else {
      console.log(newUserObject);
    }
  };

  if (!user) {
    return (
      <div className="login_container">
        <h2>{contentObj?.[language].register.title}</h2>
        <div className="login_credentials">
          <h3>{contentObj?.[language].register.loginCredentials}:</h3>
          <form onSubmit={(e) => onSubmit(e)} action="">
            <input
              type="email"
              placeholder={contentObj?.[language].register.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder={contentObj?.[language].register.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder={contentObj?.[language].register.confirm}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="name"
              placeholder={contentObj?.[language].register.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder={contentObj?.[language].register.avatar}
              value={avatarLink}
              onChange={(e) => setAvatarLink(e.target.value)}
            />
            <button style={{ marginTop: "2rem" }} type="submit">
              <div className="button_container">
                {contentObj?.[language].register.sign}
              </div>
            </button>
          </form>
          <h3>{contentObj?.[language].register.useGoogle}</h3>
          <button onClick={GoogleLogin}>
            <div className="button_container">
              <FcGoogle className="react-icon" />
              {contentObj?.[language].register.signInGoogle}
            </div>
          </button>
        </div>
      </div>
    );
  } else return navigate("/start");
}
