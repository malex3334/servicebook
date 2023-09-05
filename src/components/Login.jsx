import React, { useContext, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, app } from "../utils/firebase";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { user } = useContext(DataContext);
  const [email, setEmail] = useState("testing@test.pl");
  const [password, setPassword] = useState("testing");

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

  // login email and password
  const emailAndPasswordLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  // end

  if (!user) {
    return (
      <div className="login_container">
        <h2>Login:</h2>
        <div className="login_credentials">
          <h3>Podaj dane logowania:</h3>
          <form onSubmit={(e) => emailAndPasswordLogin(e)} action="">
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button style={{ marginTop: "2rem" }} type="submit">
              <div className="button_container">Log in</div>
            </button>
          </form>
          <h3>lub użyj serwisu:</h3>
          <button onClick={GoogleLogin}>
            <div className="button_container">
              <FcGoogle className="react-icon" />
              Sign in with Google
            </div>
          </button>
        </div>
      </div>
    );
  } else return navigate("/cars");
}
