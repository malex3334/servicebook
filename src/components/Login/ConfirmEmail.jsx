import React from "react";
import { activationMsg } from "../../helpers/Helpers";
import { sendEmailVerification } from "firebase/auth";

export default function ConfirmEmail() {
  return (
    <div style={{ minHeight: "80vh" }}>
      <h3 style={{ color: "red", fontSize: "2.25rem" }}>{activationMsg}</h3>
      {/* <p>
        Jeśli waidomość nie dotarła, wyślij ponownie klikając w przycisk
        poniżej:
      </p> */}
      {/* <button onClick={() => sendEmailVerification(user)}></button> */}
    </div>
  );
}
