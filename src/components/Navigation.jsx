import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { dummyUser } from "../data/dummyCars";
import { NavLink } from "react-router-dom";
import { auth } from "../utils/firebase";

export default function Navigation() {
  const { user, logIn, isLogged } = useContext(DataContext);

  return (
    <div>
      <ul className="nav-list">
        <NavLink to="/start">Start</NavLink>
        <NavLink to="/about">About</NavLink>
        {isLogged ? (
          <NavLink to="/cars">
            <button onClick={() => logIn(dummyUser)}>Login</button>
          </NavLink>
        ) : (
          <>
            <NavLink to="/cars">My Garage</NavLink>
            {user ? (
              <span className="user_container">
                Hello, {user?.displayName}
                {/* {user && user.name} */}
                <img className="user_img" src={user?.photoURL}></img>
              </span>
            ) : null}
            {/* <button onClick={() => logIn(null)}>Logout</button> */}
            {!user && (
              <NavLink to="/login">
                <button className="login_btn">login</button>
              </NavLink>
            )}
            {user && <button onClick={() => auth.signOut()}>Logout</button>}
          </>
        )}
      </ul>
    </div>
  );
}
