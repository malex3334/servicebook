import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { dummyUser } from "../data/dummyCars";
import { NavLink } from "react-router-dom";
import { auth } from "../utils/firebase";
import { contentObj } from "../language";
import { MdLanguage } from "react-icons/md";

export default function Navigation() {
  const {
    user,
    logIn,
    isLogged,
    setUserCarIDs,
    setCars,
    language,
    setLanguage,
  } = useContext(DataContext);

  console.log(language);

  return (
    <div>
      <ul className="nav-list">
        <li
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5em",
          }}
        >
          <label htmlFor="">
            <MdLanguage
              style={{ fontSize: "1.2em" }}
              className="language_icon"
            />
          </label>
          <select
            onChange={(e) => setLanguage(e.target.value)}
            name="language"
            id=""
          >
            <option value="pl">PL</option>
            <option value="en">EN</option>
          </select>
        </li>
        <NavLink className="navlink" to="/start">
          Start
        </NavLink>
        <NavLink className="navlink" to="/about">
          {contentObj?.[language].about.title}
        </NavLink>
        {isLogged ? (
          <NavLink className="navlink" to="/cars">
            <button onClick={() => logIn(dummyUser)}>
              {contentObj?.[language].login}
            </button>
          </NavLink>
        ) : (
          <>
            <NavLink className="navlink" to="/cars">
              {contentObj?.[language].myCars.title}
            </NavLink>
            {user ? (
              <span className="user_container">
                {contentObj?.[language].welcome},{" "}
                {user.displayName != null ? user.displayName : "Anonymous"}
                {/*to do: default user photo or icon */}
                <img
                  alt="user avatar"
                  className="user_img"
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png"
                  }
                ></img>
              </span>
            ) : null}
            {!user && (
              <NavLink className="navlink" to="/login">
                <button className="login_btn">
                  {contentObj?.[language].login}
                </button>
              </NavLink>
            )}
            {user && (
              <button
                onClick={() => {
                  auth.signOut();
                  setUserCarIDs([]);
                  setCars([]);
                }}
              >
                {contentObj?.[language].logout}
              </button>
            )}
          </>
        )}
      </ul>
    </div>
  );
}
