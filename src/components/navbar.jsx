import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function navBar() {
  return (
    <div className="navigation">
      <div >
        <Link to="/" className="sitename">
          <p>BitChainX</p>
        </Link>
      </div>
      <div className="pacbuttons">
        <button className="navbutton">Profile</button>
        <button className="navbutton">About Us</button>
        <button className="navbutton">Contact Us</button>
      </div>
      <div className="lrmbuttons">
        <button className="navbutton">
          <Link className="navlink" to="/login">
            Login{" "}
          </Link>
        </button>
        <button className="navbutton">
          <Link className="navlink" to="/signup">
            Register
          </Link>
        </button>
        <button className="navbutton">
          <Link className="navlink" to="/marketplace">
            Marketplace
          </Link>
        </button>
      </div>
    </div>
  );
}

export default navBar;
