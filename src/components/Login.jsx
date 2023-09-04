import React, { useContext } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { user } = useContext(DataContext);
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

  if (!user) {
    return (
      <div>
        <h2>Login:</h2>
        <button onClick={GoogleLogin}>
          <div className="button_container">
            <FcGoogle className="react-icon" />
            Sign in with Google
          </div>
        </button>
      </div>
    );
  } else return navigate("/start");
}
