import React from "react";
import "../styles/landing.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import img from "../assets/bgImage1.jpg";

function Landing() {
  return (
    <div className="landingContainer">
      <div className="landingWelcome">
        <h1>Welcome to BidChainX</h1>
        <p className="wlcmTxt">
          Unveiling the Future of Auctions: Secure, Transparent, and
          Decentralized.
        </p>
        <h3>Get Started with BidChainX</h3>
        <p className="wlcmTxt">
          Install MetaMask, create your wallet, and explore the world of
          decentralized auctions!
        </p>
        <br />
        <h3>Ready to Bid?</h3>
        <p className="wlcmTxt">
          Discover unique items, make secure transactions, and join the
          blockchain revolution.
        </p>
        <Link to="/auctions">
        <button className="toMarket">Shop now!</button>
        </Link>        
        <br />
        <br />
        <p className="wlcmTxt">Learn more about us!</p>
        <button className="toAbtUs">About Us</button>
        <br />
        <br />
        <p className="wlcmTxt">Contact us at support@bidchain.com</p>
      </div>
      <div class="background-image"></div>
    </div>
  );
}

export default Landing;
