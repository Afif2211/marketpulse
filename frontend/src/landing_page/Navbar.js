import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function Navbar() {

  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar navbar-expand-lg shadow-sm sticky-top custom-navbar">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand brand-text" to="/">
          <span className="brand-market">Market</span>
          <span className="brand-pulse">Pulse</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center">

            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/support">
                Support
              </Link>
            </li>

            <li className="nav-item ms-2">
              <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </button>
            </li>

            <li className="nav-item ms-3">
              <Link to="/signup" className="btn signup-btn">
                Sign Up
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;