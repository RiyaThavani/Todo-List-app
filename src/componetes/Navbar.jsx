import { FaCheckSquare } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BsCloudSunFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/theme-context";
import Alertbox from "./Alertbox";
const Navbar = () => {
  const navigate = useNavigate();
  const {theme, toggleTheme} = useContext(ThemeContext)
  const[showLogout,setLogout] = useState(false);
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loginData");
    setLogout(true);

    
  };
  const handlelogoutconfirm=(event) =>{
    event.preventDefault();
    navigate("/Login");
  }
  const handlelogoutcancle=(event)=>{
    event.preventDefault();
    setLogout(false);
  }
  // console.log({ theme });

  return (
    <>
      {showLogout && <Alertbox  handlelogoutconfirm={handlelogoutconfirm} handlelogoutcancle={handlelogoutcancle}/>}
      <div className="navbar">
      {/* <div className={"dark"}> */}
        <div className="logo">
          <a  className="text-todo">
            TODO
            <span>
              <FaCheckSquare size={23}  />
            </span>
          </a>
        </div>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "link-active" : "link-line")}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/about"  className={({ isActive }) => (isActive ? "link-active" : "link-line")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/List"  className={({ isActive }) => (isActive ? "link-active" : "link-line")}>
              All Todos
            </NavLink>
          </li>
        </ul>
        <div className="logout">
          <div onClick={toggleTheme}>
            {theme === "dark" ? (
              <BsCloudSunFill size={23} className="light" />
            ) : (
              <BsFillMoonStarsFill size={23} className="light" />
            )}
          </div>
          <button type="button" className="btn-red" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
