import React, { useContext, useEffect, useState } from "react";
import { activationMsg } from "../../helpers/Helpers";
import {
  onAuthStateChanged,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import toast from "react-hot-toast";

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const auth = getAuth();
  const { user } = useContext(DataContext);

  useEffect(() => {
    const checkEmailVerification = (user) => {
      if (user) {
        if (user.emailVerified) {
          console.log("Email is verified");
          navigate("/user");
        } else {
          console.log("test");
          auth.currentUser.reload();
        }
      }
    };

    const unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
      checkEmailVerification(user);
    });

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkEmailVerification(auth.currentUser);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup functions
    return () => {
      unsubscribeAuthState();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const sendAgain = async () => {
    try {
      await sendEmailVerification(user);
      toast.success("Wysłano email aktywacyjny");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5rem",
      }}>
      <h3 style={{ color: "red", fontSize: "2.25rem" }}>{activationMsg}</h3>
      <span style={{ fontStyle: "italic" }}>{user?.email}</span>
      <p>
        Jeśli wiadomość nie dotarła, wyślij ponownie klikając w przycisk
        poniżej:
      </p>
      <button onClick={() => sendAgain()}>Wyślij ponownie</button>
    </div>
  );
}
