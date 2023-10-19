import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { contentObj } from "../language";
import { MdLanguage } from "react-icons/md";
import LogoComponent from "./LogoComponent";
import { useEffect, useState } from "react";
import { RiHomeLine } from "react-icons/ri";
import { PiGarageBold, PiInfo } from "react-icons/pi";
import { MdLogout, MdLogin } from "react-icons/md";
import NavIcon from "./NavIcon";

export default function Navigation() {
  const navigate = useNavigate();
  const { user, userData, setUserCarIDs, setCars, language, setLanguage } =
    useContext(DataContext);

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
          {!isMobile ? (
            "Start"
          ) : (
            <NavIcon
              title={"Start"}
              icon={<RiHomeLine className="nav-icon" />}
            />
          )}
        </NavLink>
        <NavLink className="navlink" to="/about">
          {!isMobile ? (
            contentObj?.[language].about.navTitle
          ) : (
            <NavIcon
              title={contentObj?.[language].about.navTitle}
              icon={<PiInfo className="nav-icon" />}
            />
          )}
        </NavLink>
        <>
          <NavLink className="navlink" to="/cars">
            {!isMobile ? (
              contentObj?.[language].myCars.title
            ) : (
              <NavIcon
                title={contentObj?.[language].myCars.title}
                icon={<PiGarageBold className="nav-icon" />}
              />
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
                      userData?.photoURL
                        ? userData?.photoURL
                        : "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png"
                    }
                  ></img>
                </span>
              ) : (
                <NavIcon
                  title={
                    userData?.name == null
                      ? "Anonymous"
                      : userData?.name.split(" ") >= 1
                      ? userData?.name
                      : userData?.name.split(" ")[0]
                  }
                  icon={
                    <img
                      alt="user avatar"
                      className="user_img"
                      src={
                        userData?.photoURL
                          ? userData?.photoURL
                          : "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png"
                      }
                    />
                  }
                />
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
                <NavIcon
                  title={contentObj?.[language].login}
                  icon={<MdLogin className="nav-icon" />}
                />
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
              <NavIcon
                title={contentObj?.[language].logout}
                icon={
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
                }
              />
            ))}
        </>
      </ul>
    </div>
  );
}
