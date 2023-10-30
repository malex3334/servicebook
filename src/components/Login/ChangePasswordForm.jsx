import React from "react";
import Input from "../Input";
import { useState } from "react";
import { auth } from "../../utils/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import Loading from "../Loading";

export default function ChangePasswordForm({ handleCancel }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const clearInputs = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const cancel = () => {
    handleCancel();
    clearInputs();
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    const user = auth.currentUser;

    e.preventDefault();
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    if (newPassword === confirmNewPassword) {
      try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        toast.success("hasło zmienione");
        cancel();
      } catch (error) {
        toast.error(error);
        console.error("error changing password:", error);
      }
    } else {
      toast.error("nieprawidłowe nowe hasło");
    }
    setLoading(false);
  };

  return (
    <div className="name_container">
      {loading ? (
        <Loading />
      ) : (
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="">zmień hasło:</label>
          <Input
            name="aktualne hasło"
            value={currentPassword}
            type="password"
            onChange={setCurrentPassword}
          />

          <Input
            name="nowe hasło"
            value={newPassword}
            type="password"
            onChange={setNewPassword}
          />
          <Input
            name="potwierdź nowe hasło"
            value={confirmNewPassword}
            type="password"
            onChange={setConfirmNewPassword}
          />
          <button type="submit">zatwierdź</button>
          <button onClick={cancel}>anuluj</button>
        </form>
      )}
    </div>
  );
}
