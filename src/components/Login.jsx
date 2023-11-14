import React, { useContext, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, app } from "../utils/firebase";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Loading from "./Loading";
import { contentObj } from "../language";
import Input from "./Input";
import Register from "./Register";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { user, language } = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

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
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/cars");
        console.log(user);
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        setTimeout(() => {
          setError(null);
        }, 3000);
        console.log(errorCode, errorMessage);
      });
  };

  // end

  // if (loading) {
  //  return <Loading />
  //}

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "5rem",
          flexWrap: "wrap",
        }}>
        <Register />
        <div className="login_container container">
          <h2>{contentObj?.[language].loginPage.title}:</h2>
          <div className="login_credentials">
            <h3>{contentObj?.[language].loginPage.loginCredentials}:</h3>
            {loading ? (
              <Loading />
            ) : (
              <form onSubmit={(e) => emailAndPasswordLogin(e)} action="">
                <div className="name_container">
                  <Input
                    type="email"
                    value={email}
                    onChange={setEmail}
                    name={contentObj?.[language].loginPage.email}
                  />

                  <Input
                    type="password"
                    value={password}
                    onChange={setPassword}
                    name={contentObj?.[language].loginPage.password}
                  />
                </div>

                <span style={{ color: "red" }}>
                  {error && `${contentObj?.[language].loginPage.wrongUser}`}
                </span>
                <button style={{ marginTop: "2rem" }} type="submit">
                  <div className="button_container">
                    {contentObj?.[language].loginPage.login}
                  </div>
                </button>
              </form>
            )}
            <h3>{contentObj?.[language].loginPage.useServices}:</h3>

            <button onClick={GoogleLogin}>
              <div className="button_container">
                <FcGoogle className="react-icon" />
                {contentObj?.[language].loginPage.useGoogle}
              </div>
            </button>
          </div>
        </div>
        <div className="login_container">{/* <Register /> */}</div>
      </div>
    );
  } else return navigate("/cars");
}
