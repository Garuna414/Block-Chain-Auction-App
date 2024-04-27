import React/*, { useState }*/ from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/navbar.css";
import toggleIcon from "../assets/menu.png";
import { Link } from "react-router-dom";

function Navbar({ onButtonClick }) {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{ position: "fixed", width: "100%" }}
    >
      <div className="container-fluid d-flex justify-content-between">
        <button onClick={onButtonClick} className="toggleBtn">
          <img src={toggleIcon} alt="" />
        </button>
        <div className="homeMarket">
          <Link to="/">
            <button className="navButton">Home</button>
          </Link>
          <Link to="/auctions">
            <button className="navButton">Marketplace</button>
          </Link>
        </div>
        <a className="navbar-brand" href="/">
          BidChainX
        </a>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Link
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </nav>
  );
}

export default Navbar;
