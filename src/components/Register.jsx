import React, { useContext, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../utils/firebase";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { uuidv4 } from "@firebase/util";
import { contentObj } from "../language";
import Input from "./Input";
import { NavLink } from "react-router-dom";
import { imgWarning } from "../helpers/Helpers";
import toast from "react-hot-toast";
import { activationMsg } from "../helpers/Helpers";

export default function Login() {
  const { user, language } = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarLink, setAvatarLink] = useState("");
  const navigate = useNavigate();

  const newUserObject = {
    displayName: name,
    email,
    password,
    avatarLink,
    id: uuidv4(),
  };

  const handleRegistration = async () => {
    const db = getFirestore();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        name
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      // After creating the user, update their profile
      await updateProfile(user, {
        displayName: name,
        photoURL: avatarLink,
      });
      const checkData = async () => {
        await setDoc(doc(db, "users", user?.uid), {
          email,
          photoURL: avatarLink,
          name: user.displayName,
          id: user?.uid,
          confirmed: false,
        });
      };
      checkData();
      toast.success(activationMsg);
      auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

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
      handleRegistration();
    }
  };

  if (!user) {
    return (
      <div className="login_container" style={{ minHeight: "79vh" }}>
        <h2>{contentObj?.[language].register.title}</h2>
        <div className="login_credentials">
          <div>
            <span>Masz już swoje konto?</span>
            <br />
            <NavLink to="/login">
              <span style={{ fontSize: "2rem" }}>Zaloguj się</span>
            </NavLink>
          </div>
          <h3>{contentObj?.[language].register.loginCredentials}:</h3>
          <form onSubmit={(e) => onSubmit(e)} action="">
            <div className="name_container">
              <Input
                type="email"
                value={email}
                onChange={setEmail}
                name={contentObj?.[language].register.email}
              />

              <Input
                type="text"
                value={name}
                onChange={setName}
                name={contentObj?.[language].register.name}
              />
              <Input
                type="password"
                value={password}
                onChange={setPassword}
                name={contentObj?.[language].register.password}
              />

              <Input
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                name={contentObj?.[language].register.confirm}
              />

              <Input
                type="text"
                value={avatarLink}
                onChange={setAvatarLink}
                name={contentObj?.[language].register.avatar}
                note={imgWarning}
              />

              <button style={{ marginTop: "2rem" }} type="submit">
                <div className="button_container">
                  {/* {contentObj?.[language].register.sign} */}
                  Zarejestruj
                </div>
              </button>
            </div>
          </form>
          {/* <h3>{contentObj?.[language].register.useGoogle}</h3>
          <button onClick={GoogleLogin}>
            <div className="button_container">
              <FcGoogle className="react-icon" />
              {contentObj?.[language].register.signInGoogle}
            </div>
          </button> */}
        </div>
      </div>
    );
  } else return navigate("/start");
}
