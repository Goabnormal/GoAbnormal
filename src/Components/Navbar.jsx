import React from "react";
import logo from "../Assets/Images/goabnormaltec_logo.png";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar-wrapper">
      <div className="glass-navbar">
        <a className="navbar-brand" href="#home">
          <img src={logo} className="img-fluid" alt="logo" />
        </a>

        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          ☰
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#services">
                Services
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </li>
          </ul>

          <a href="#contact">
            <button className="contact-btn">
              Let's Talk
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;