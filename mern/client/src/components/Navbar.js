/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light navbarColor">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img id="nav-img" src={logo} alt="mylogo" className="img-fluid" />
          </Link>

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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="navbar-brand" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand" aria-current="page" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="navbar-brand"
                  aria-current="page"
                  to="/contact"
                >
                  contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand" aria-current="page" to="/login">
                  login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand" aria-current="page" to="/signup">
                  SignUp
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
