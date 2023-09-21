import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { dummyUser } from "../data/dummyCars";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { contentObj } from "../language";
import { MdLanguage } from "react-icons/md";
import LogoComponent from "./LogoComponent";
import { useEffect, useState } from "react";
import { RiLogoutBoxRLine, RiHomeLine } from "react-icons/ri";
import { PiGarageBold, PiInfo } from "react-icons/pi";
import { MdLogout, MdLogin } from "react-icons/md";

export default function Navigation() {
  const navigate = useNavigate();
  const {
    user,
    userData,
    logIn,
    isLogged,
    setUserCarIDs,
    setCars,
    language,
    setLanguage,
  } = useContext(DataContext);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(isMobile);

  return (
    <div className="nav_container">
      {!isMobile ? <LogoComponent /> : null}
      <ul className="nav-list">
        <li
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5em",
          }}
        >
          {!isMobile ? (
            <label htmlFor="">
              <MdLanguage
                style={{ fontSize: "1.2em" }}
                className="language_icon"
              />
            </label>
          ) : null}
          <select
            onChange={(e) => setLanguage(e.target.value)}
            name="language"
            id=""
          >
            <option value="pl">PL</option>
            <option value="en">EN</option>
          </select>
        </li>
        <NavLink className="navlink" to="/" end>
          {!isMobile ? "Start" : <RiHomeLine className="nav-icon" />}
        </NavLink>
        <NavLink className="navlink" to="/about">
          {!isMobile ? (
            contentObj?.[language].about.title
          ) : (
            <PiInfo className="nav-icon" />
          )}
        </NavLink>
        <>
          <NavLink className="navlink" to="/cars">
            {!isMobile ? (
              contentObj?.[language].myCars.title
            ) : (
              <PiGarageBold className="nav-icon" />
            )}
          </NavLink>
          {user ? (
            <NavLink className="navlink" to="/user">
              {!isMobile ? (
                <span className="user_container">
                  {contentObj?.[language].welcome},{" "}
                  {userData?.name != null ? userData?.name : "Anonymous"}
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
              ) : (
                <img
                  alt="user avatar"
                  className="user_img"
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png"
                  }
                ></img>
              )}
            </NavLink>
          ) : null}
          {!user && (
            <NavLink className="navlink" to="/login">
              {!isMobile ? (
                <button className="hero_btn">
                  {contentObj?.[language].login}
                </button>
              ) : (
                <MdLogin className="nav-icon" />
              )}
            </NavLink>
          )}

          {user &&
            (!isMobile ? (
              <button
                onClick={() => {
                  auth.signOut();
                  setUserCarIDs([]);
                  setCars([]);
                  navigate("/");
                }}
              >
                {contentObj?.[language].logout}
              </button>
            ) : (
              <MdLogout
                style={{ cursor: "pointer" }}
                className="nav-icon"
                onClick={() => {
                  auth.signOut();
                  setUserCarIDs([]);
                  setCars([]);
                  navigate("/");
                }}
              />
            ))}
        </>
      </ul>
    </div>
  );
}
