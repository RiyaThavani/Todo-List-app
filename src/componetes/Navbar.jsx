import { FaCheckSquare } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BsCloudSunFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/theme-context";
import Alertbox from "./Alertbox";
const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [showLogout, setLogout] = useState(false);
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loginData");
    setLogout(true);


  };
  const handlelogoutconfirm = (event) => {
    event.preventDefault();
    navigate("/Login");
  }
  const handlelogoutcancle = (event) => {
    event.preventDefault();
    setLogout(false);
  }
  // console.log({ theme });

  return (
    <>
      {showLogout && <Alertbox handlelogoutconfirm={handlelogoutconfirm} handlelogoutcancle={handlelogoutcancle} />}
      <div className={theme === "dark" ? "navbar" : "navbar-light"}>
        {/* <div className={"dark"}> */}
        <div className="logo">
          <a className="text-todo">
            TODO LIST APP
            <span>
              <FaCheckSquare size={23} />
            </span>
          </a>
        </div>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? (theme === "dark" ? "link-active" : "link-active-light") : (theme === "dark" ? "link-line" : "link-line-light"))}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? (theme === "dark" ? "link-active" : "link-active-light") : (theme === "dark" ? "link-line" : "link-line-light"))}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/List" className={({ isActive }) => (isActive ? (theme === "dark" ? "link-active" : "link-active-light") : (theme === "dark" ? "link-line" : "link-line-light"))}>
              All Todos
            </NavLink>
          </li>
        </ul>
        <div className="logout">
          <button
            type="button"
            className={theme === "dark" ? "theme-toggle" : "theme-toggle-light"}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <BsCloudSunFill size={20} />
            ) : (
              <BsFillMoonStarsFill size={20} />
            )}
          </button>
          <button type="button" className={theme === "dark" ? "btn-red" : "btn-red-light"} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
