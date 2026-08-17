import { FaCheckSquare, FaBars, FaTimes } from "react-icons/fa";
import { BsFillMoonStarsFill, BsCloudSunFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/theme-context";
import Alertbox from "./Alertbox";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showLogout, setLogout] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const loginData = (() => {
    try {
      return JSON.parse(localStorage.getItem("loginData")) || null;
    } catch {
      return null;
    }
  })();

  const displayName = loginData?.username || "TODO LIST APP";

  // Close mobile menu on ESC key or window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = (event) => {
    if (event) event.preventDefault();
    setMobileMenuOpen(false);
    setLogout(true);
  };

  const handlelogoutconfirm = (event) => {
    if (event) event.preventDefault();
    localStorage.removeItem("loginData");
    setLogout(false);
    navigate("/Login");
  };

  const handlelogoutcancle = (event) => {
    if (event) event.preventDefault();
    setLogout(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {showLogout && (
        <Alertbox
          handlelogoutconfirm={handlelogoutconfirm}
          handlelogoutcancle={handlelogoutcancle}
        />
      )}

      <nav className={theme === "dark" ? "navbar" : "navbar-light"}>
        {/* Brand / Logo */}
        <div className="logo">
          <NavLink to="/" className="text-todo" onClick={closeMobileMenu}>
            TODO LIST APP
            <span>
              <FaCheckSquare size={22} />
            </span>
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="desktop-nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? theme === "dark"
                    ? "link-active"
                    : "link-active-light"
                  : theme === "dark"
                  ? "link-line"
                  : "link-line-light"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? theme === "dark"
                    ? "link-active"
                    : "link-active-light"
                  : theme === "dark"
                  ? "link-line"
                  : "link-line-light"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/List"
              className={({ isActive }) =>
                isActive
                  ? theme === "dark"
                    ? "link-active"
                    : "link-active-light"
                  : theme === "dark"
                  ? "link-line"
                  : "link-line-light"
              }
            >
              All Todos
            </NavLink>
          </li>
        </ul>

        {/* Desktop Controls (Theme Toggle + Logout) */}
        <div className="desktop-controls">
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
          <button
            type="button"
            className={theme === "dark" ? "btn-red" : "btn-red-light"}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Mobile Navbar Controls (Theme Toggle + Hamburger) */}
        <div className="mobile-nav-toggle-group">
          <button
            type="button"
            className={theme === "dark" ? "theme-toggle" : "theme-toggle-light"}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <BsCloudSunFill size={18} />
            ) : (
              <BsFillMoonStarsFill size={18} />
            )}
          </button>
          <button
            type="button"
            className={`hamburger-btn ${theme === "dark" ? "hamburger-dark" : "hamburger-light"}`}
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile App View Menu Overlay & Card */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={closeMobileMenu}>
          <div
            className={`mobile-menu-card ${theme === "dark" ? "card-dark" : "card-light"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Brand/Name + Close Button */}
            <div className="mobile-menu-header">
              <div className="mobile-menu-title">
                <span>{displayName}</span>
                <span className="dot-indicator"></span>
              </div>
              <button
                type="button"
                className="mobile-close-btn"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Navigation Links with Dividers */}
            <div className="mobile-menu-links">
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `mobile-nav-item ${isActive ? "active" : ""}`
                }
              >
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/about"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `mobile-nav-item ${isActive ? "active" : ""}`
                }
              >
                <span>About</span>
              </NavLink>

              <NavLink
                to="/List"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `mobile-nav-item ${isActive ? "active" : ""}`
                }
              >
                <span>All Todos</span>
              </NavLink>
            </div>

            {/* Bottom Action Section (Pill Button) */}
            <div className="mobile-menu-footer">
              <button
                type="button"
                className="mobile-pill-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
