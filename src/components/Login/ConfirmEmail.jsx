import React, { useEffect, useState } from "react";
import { activationMsg } from "../../helpers/Helpers";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const auth = getAuth();

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

  return (
    <div style={{ minHeight: "80vh" }}>
      <h3 style={{ color: "red", fontSize: "2.25rem" }}>{activationMsg}</h3>
      <p>
        Jeśli wiadomość nie dotarła, wyślij ponownie klikając w przycisk
        poniżej:
      </p>
      {/* Add a button to manually send a verification email */}
    </div>
  );
}
