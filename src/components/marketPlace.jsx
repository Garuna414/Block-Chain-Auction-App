import React from "react";
import "./styles.css";
import { BrowserRouter, Routes, Link } from "react-router-dom";

function market() {
  return (
    <div className="marketContainer">
      <div className="sfbuttons">
        <label htmlFor="filters">Filters</label>
        <div className="filters">
          <select name="filters" id="filters">
            <option value="costasc">Cost Low to High</option>
            <option value="costdesc">Cost Low to High</option>
          </select>
        </div>
      </div>
      <hr />
      <div className="itemCards">
        <Link className="cardLink" to="/bid">
          <div className="card">
            <div className="imageHolder">
              <img src="./images/user.jpg" className="cardImage" />
            </div>
            <div className="cardInfo">
              <div className="itemInfo">
                <p id="IName">Item Name</p>
                <p id="IDesc">Item Description</p>
              </div>
              <div className="sellerInfo">
                <p id="SName">Seller Name</p>
                <p id="SRating">Seller Rating</p>
              </div>
            </div>
          </div>
        </Link>

        <Link className="cardLink" to="/bid">
          <div className="card">
            <div className="imageHolder">
              <img src="./images/user.jpg" className="cardImage" />
            </div>
            <div className="cardInfo">
              <div className="itemInfo">
                <p id="IName">Item Name</p>
                <p id="IDesc">Item Description</p>
              </div>
              <div className="sellerInfo">
                <p id="SName">Seller Name</p>
                <p id="SRating">Seller Rating</p>
              </div>
            </div>
          </div>
        </Link>

        <Link className="cardLink" to="/bid">
          <div className="card">
            <div className="imageHolder">
              <img src="./images/user.jpg" className="cardImage" />
            </div>
            <div className="cardInfo">
              <div className="itemInfo">
                <p id="IName">Item Name</p>
                <p id="IDesc">Item Description</p>
              </div>
              <div className="sellerInfo">
                <p id="SName">Seller Name</p>
                <p id="SRating">Seller Rating</p>
              </div>
            </div>
          </div>
        </Link>

        <Link className="cardLink" to="/bid">
          <div className="card">
            <div className="imageHolder">
              <img src="./images/user.jpg" className="cardImage" />
            </div>
            <div className="cardInfo">
              <div className="itemInfo">
                <p id="IName">Item Name</p>
                <p id="IDesc">Item Description</p>
              </div>
              <div className="sellerInfo">
                <p id="SName">Seller Name</p>
                <p id="SRating">Seller Rating</p>
              </div>
            </div>
          </div>
        </Link>

        <Link className="cardLink" to="/bid">
          <div className="card">
            <div className="imageHolder">
              <img src="./images/user.jpg" className="cardImage" />
            </div>
            <div className="cardInfo">
              <div className="itemInfo">
                <p id="IName">Item Name</p>
                <p id="IDesc">Item Description</p>
              </div>
              <div className="sellerInfo">
                <p id="SName">Seller Name</p>
                <p id="SRating">Seller Rating</p>
              </div>
            </div>
          </div>
        </Link>

        <Link className="cardLink" to="/bid">
          <div className="card">
            <div className="imageHolder">
              <img src="./images/user.jpg" className="cardImage" />
            </div>
            <div className="cardInfo">
              <div className="itemInfo">
                <p id="IName">Item Name</p>
                <p id="IDesc">Item Description</p>
              </div>
              <div className="sellerInfo">
                <p id="SName">Seller Name</p>
                <p id="SRating">Seller Rating</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default market;
