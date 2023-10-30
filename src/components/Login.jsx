import React, { useContext, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Loading from "./Loading";
import { contentObj } from "../language";
import Input from "./Input";
import Register from "./Register";
import toast from "react-hot-toast";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { user, language } = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

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

  const handlePasswordReset = (e) => {
    e.preventDefault();
    let result = window.confirm("jesteś pewien??");

    if (result) {
      console.log(auth, resetEmail);
      try {
        sendPasswordResetEmail(auth, resetEmail);
        toast.success("email z linkiem do resetowania hasła wysłany");
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    }
    setShowResetPassword(false);
    setResetEmail("");
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
        }}
      >
        <div className="login_container">
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
            <div className="reset_password">
              {!showResetPassword ? (
                <a
                  href="#"
                  style={{ fontStyle: "italic" }}
                  onClick={() => setShowResetPassword(true)}
                >
                  nie pamiętam hasła
                </a>
              ) : (
                <form action="" onSubmit={(e) => handlePasswordReset(e)}>
                  <Input
                    type="email"
                    name="podaj email"
                    value={resetEmail}
                    onChange={setResetEmail}
                  />
                  <button type="submit">zresetuj</button>
                  <button
                    onClick={() => {
                      setShowResetPassword(false);
                      setResetEmail("");
                    }}
                  >
                    anuluj
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        <Register />
      </div>
    );
  } else return navigate("/cars");
}
