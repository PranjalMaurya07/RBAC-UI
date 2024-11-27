import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/header.css"

const Header = () => {
  return (
    <nav className="header-navbar navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid header-container">
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon custom-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand header-logo">
            Admin Dashboard
          </Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 header-menu">
            <li className="nav-item">
              <NavLink to="/" className="nav-link header-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link header-link">
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/role" className="nav-link header-link">
                Role
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/permissions" className="nav-link header-link">
                Permissions
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
