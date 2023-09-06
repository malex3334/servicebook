import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { dummyUser } from "../data/dummyCars";
import { NavLink } from "react-router-dom";
import { auth } from "../utils/firebase";

export default function Navigation() {
  const { user, logIn, isLogged, setUserCarIDs } = useContext(DataContext);
  console.log(user?.displayName);
  return (
    <div>
      <ul className="nav-list">
        <NavLink className="navlink" to="/start">
          Start
        </NavLink>
        <NavLink className="navlink" to="/about">
          About
        </NavLink>
        {isLogged ? (
          <NavLink className="navlink" to="/cars">
            <button onClick={() => logIn(dummyUser)}>Login</button>
          </NavLink>
        ) : (
          <>
            <NavLink className="navlink" to="/cars">
              My Garage
            </NavLink>
            {user ? (
              <span className="user_container">
                Hello,{" "}
                {user.displayName != null ? user.displayName : "Anonymous"}
                {/*to do: default user photo or icon */}
                <img
                  alt="user avatar"
                  className="user_img"
                  src={user?.photoURL}
                ></img>
              </span>
            ) : null}
            {/* <button onClick={() => logIn(null)}>Logout</button> */}
            {!user && (
              <NavLink className="navlink" to="/login">
                <button className="login_btn">login</button>
              </NavLink>
            )}
            {user && (
              <button
                onClick={() => {
                  auth.signOut();
                  setUserCarIDs([]);
                }}
              >
                Logout
              </button>
            )}
          </>
        )}
      </ul>
    </div>
  );
}
