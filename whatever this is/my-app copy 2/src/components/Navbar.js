import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/themecontext";
import "./Navbar.css";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav
      className={theme === "dark" ? "navbar navbar-dark" : "navbar navbar-light"}
    >
      <Link className="nav-link" to="/home">
        Home
      </Link>
      <Link className="nav-link" to="/counter">
        CounterPage
      </Link>
      <button type="button" onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
    </nav>
  );
}

export default Navbar;
