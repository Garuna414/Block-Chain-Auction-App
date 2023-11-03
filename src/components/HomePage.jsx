import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const HomePage = () => {
  return (
    /*<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>*/

    /*<body>
    <div className = "body">
      <h1 className="header">BidChainX</h1>
      <div className="button-container">
      <button className="main-button">
      <Link className="header h5" to="/login">Log in </Link>
      </button>
      <button className="main-button">
      <Link className="header h5" to="/signup">Sign Up  </Link>
      </button>
      <button className="main-button">
      <Link className="header h5" to="/marketplace">Marketplace  </Link>
      </button>
      </div>
    </div>
    <div className = "main">
      <button className="contact" type="submit" color = "Green">About Us</button><br></br><br></br>
      <button className="contact" type="submit" color = "Green">Contact Us</button>
    </div>

    <div className='register_box'>
    <div className="rectangle-container">
      <div className="rectangle">        
        <div className="circle">
          <div className='login_text'>
            Existing User?
          </div><br></br><br></br>
          <button className = "login_button">LOGIN</button>
        </div>
      </div>
    </div>
    </div>
    <div className='register_box'>
    <div className="rectangle-container">
      <div className="rectangle">        
        <div className="circle">
          <div className='login_text'>   New User?
          </div><br></br><br></br>
          <button className = "login_button">SIGN UP</button>
        </div>
      </div>
    </div>
    </div>
  </body> */

    <div className="home">
      <div className="homeImgHolder">
        <img src="/images/homeImg.jpg" className="homeImage" />
      </div>

      <h1 className="welcomeText">WELCOME TO BITCHAINX!</h1>
      <div className="homeText">
        <h2 style={{ fontSize: "50px" }}></h2>
        <p style={{ fontSize: "30px", marginBottom: "0" }}>
          A <u style={{ fontSize: "40px", textDecoration:"none" }}>BLOCKCHAIN-POWERED AUCTION PLATFORM</u>, redefining online auctions with trust and
        </p>
        <p style={{ color: "black", fontSize: "30px", marginTop: "0" }}>
          <u style={{ fontSize: "40px" }}></u> transparency. Our mission is to provide
          secure, user friendly auctions using blockchain technology and smart
          contracts. Join us to experience the future of hassle free online
          bidding.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
