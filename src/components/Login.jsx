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
import Loading from "./Loading";

export default function Login() {
  const [loading, setLoading] = useState(false)
  const { user } = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)

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
      setLoading(true)
       signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
    
        // Signed in
        const user = userCredential.user;
        navigate("/cars");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage)
        setTimeout(() => {
          setError(null)
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
      <div className="login_container">
        <h2>Login:</h2>
        <div className="login_credentials">
          <h3>Podaj dane logowania:</h3>
            {loading ? <Loading /> : 
          <form onSubmit={(e) => emailAndPasswordLogin(e)} action="">
            <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <span style={{color:'red'}}>{error && 'wrong user or password'}</span>
            <button style={{ marginTop: "2rem" }} type="submit">
              <div className="button_container">Log in</div>
            </button>
          </form>
            }
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
