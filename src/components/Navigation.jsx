import React, { useState, useEffect } from "react";
import "../styles/navigation.css";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import img from "../assets/user.png";
import Rating from "./Rating";

function Navigation({ name, account, balance, rating }) {
  const [items, setItems] = useState([]);
  const [liveAuc, setLiveAuc] = useState(false);
  const [usrRating, setUsrRaing] = useState(rating);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (account) {
      //console.log(rating);
      fetchData();
    }
  }, [account]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = "http://localhost:5000/auctions/non-finished";
      const response = await axios.get(url);
      //console.log(`${account}`)

      // Check if any auction in the response belongs to the current account
      const liveAuc = response.data.some((auction) => {
        //console.log(auction.owner);
        if (auction.owner == account) {
          setLiveAuc(true);
          return true;
        }
        setLiveAuc(false);
        return false;
      });

      // Set items and liveAuc state
      // setItems(response.data);
      // console.log(response.data);
      // console.log(liveAuc);
    } catch (error) {
      console.error("Error fetching auction items:", error);
    } finally {
      // Use setTimeout to ensure loading screen shows for at least 1 second
      setTimeout(() => {
        setLoading(false); // Hide loading screen after 1 second
      }, 250);
    }
  };

  return (
    <div className="dashContainer">
      <p className="heading">Dashboard</p>
      <div className="self-info">
        <img src={img} alt="" className="userImg" />
        <p className="data-1">{name}</p>
        <p className="data-1">.....{account.slice(-5)}</p>
        <p className="data-2">{balance} ETH</p>
        <p className="data-2">Rating: {rating}</p>
        <Rating props={rating} />
      </div>
      <div className="dash-nav">
        <Link to="/expenses">
          <button className="dashButton">Expenses</button>
        </Link>
        {/* <Link to="/newItem">
          <button className="dashButton">Wallet</button>
        </Link> */}
        <Link to="/earnings">
          <button className="dashButton">Earnings</button>
        </Link>
        {liveAuc && (
          <Link to="/bidding">
            <button className="dashButton">Auctions</button>
          </Link>
        )}
        {!liveAuc && (
          <Link
            to={{
              pathname: "/newItem", // or any other route
              state: { acc: account},
            }}
          >
            <button className="dashButton">Auctions</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navigation;
