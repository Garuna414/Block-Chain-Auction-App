import React, { useState, useEffect } from "react";
import "./styles.css";
import Form from "react-bootstrap/Form";

function Bidding() {
  const bidImg =
    "https://images.unsplash.com/photo-1582901109033-8aad6fed8168?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW50aXF1ZSUyMGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D";
  const [itemName, setItemName] = useState("Painting");
  const [itemDesc, setItemDesc] = useState(
    "Antique painting by famous artist XYZ. Painted in 1950."
  );
  const [sName, setSName] = useState("John Doe");
  const [itemTags, setItemTags] = useState([
    "furniture",
    "antique",
    "physical",
    "wooden",
  ]);
  const [sRating, setSRating] = useState(4.2);
  const [status, setStatus] = useState("ONGOING");
  const [currentBid, setCurrentBid] = useState(2000);
  const [inputValue, setInputValue] = useState("");
  const [bidAmount, setBidAmount] = useState(0);
  const [bidTimer, setBidTimer] = useState(60);
  const [btnState, setBtnState] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [balance, setBalance] = useState(5000);
  const [successModal, setSuccessModal] = useState(false);
  const [timeOutModal, setTimeOutModal] = useState(false);
  const [noNullModal, setNoNullModal] = useState(false);
  const [higherBidModal, setHigherBidModal] = useState(false);
  const [noBalanceModal, setNoBalanceModal] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2023-11-04T23:59:59");
    const updateRemainingTime = () => {
      const currentDate = new Date();
      const timeDiff = targetDate - currentDate;
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    const intervalId = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (bidTimer > 0) {
        setBidTimer((prevTime) => prevTime - 1);
      } else {
        setStatus("OVER");
        setTimeOutModal(true);
        setBtnState(true);
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [bidTimer]);

  const closeModal = () => {
    setSuccessModal(false);
    setNoNullModal(false);
    setNoBalanceModal(false);
    setTimeOutModal(false);
    setHigherBidModal(false);
  };

  const chkInput = () => {
    if (bidTimer == 0) {
      setTimeOutModal(true);
    } else if (+inputValue > balance) {
      setNoBalanceModal(true);
    } else if (inputValue == null || +inputValue == 0) {
      setNoNullModal(true);
    } else if (+inputValue <= currentBid) {
      setHigherBidModal(true);
    } else {
      return true;
    }
  };

  const updateBids = () => {
    setCurrentBid(inputValue);
    setBalance(balance - inputValue);
    setBidTimer(60);
  };

  const submit = () => {
    if (chkInput()) {
      updateBids();
      setSuccessModal(true);
    }
  };

  return (
    <div className="bidContainer">
      <div className="biddingBox">
        <div className="imageInfo">
          <div>
            <img src={bidImg} className="image" alt="Item" />
          </div>
        </div>

        <div className="bidUserInfo">
          <div className="bidInfo">
            <div className="sellerDetails">
              <p id="SName">Seller: {sName}</p>
              <p id="SRating" style={{ fontSize: "20px", marginBottom: "0" }}>
                Rating: {sRating}
              </p>
            </div>

            <div className="itemDetails">
              <div className="tags">
                {itemTags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <p id="itemName">Product: {itemName}</p>
              <p id="itemDesc" style={{ fontSize: "20px" }}>
                {itemDesc}
              </p>
              <p id="bidStatus" style={{ marginBottom: "0" }}>
                Status: {status}
              </p>
            </div>

            <div className="timeInfo">
              <p id="timeLeft" style={{ marginBottom: "0" }}>
                Time Remaining: {timeLeft.days}:{timeLeft.hours}:
                {timeLeft.minutes}:{timeLeft.seconds}
              </p>
            </div>
          </div>

          <div className="userInfo">
            <p id="balance">BALANCE: {balance} currency</p>
            <div className="bidAmount">
              <p id="currentBid">CURRENT BID: {currentBid}</p>
              <div className="bidInput">
                <form style={{ display: "flex", flexDirection: "row" }}>
                  <p>Your Bid:&nbsp;</p>
                  <Form.Group className=" bidValue" controlId="bidValue">
                    <Form.Control
                      required
                      type="number"
                      placeholder={0}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </Form.Group>
                </form>
              </div>
            </div>

            <div className="placeBidTimer">
              <button
                className="placeBid"
                id="openModalButton"
                onClick={submit}
                disabled={btnState}
              >
                Place Bid
              </button>
              <p style={{ marginBottom: "0" }}>Bid in {bidTimer}s</p>
            </div>

            {successModal && (
              <div className="overlay" onClick={closeModal}>
                <div className="popUp">
                  <div className="modalMsg">
                    <span className="close" onClick={closeModal}>
                      &times;
                    </span>
                    <h2>SUCCESS</h2>
                    <p>Bid of {inputValue} successfully placed!!</p>
                  </div>
                </div>
              </div>
            )}

            {noNullModal && (
              <div className="overlay" onClick={closeModal}>
                <div className="popUp">
                  <div className="modalMsg">
                    <span className="close" onClick={closeModal}>
                      &times;
                    </span>
                    <h2>INVALID INPUT</h2>
                    <p>Please enter a valid bid value!!</p>
                  </div>
                </div>
              </div>
            )}

            {noBalanceModal && (
              <div className="overlay" onClick={closeModal}>
                <div className="popUp">
                  <div className="modalMsg">
                    <span className="close" onClick={closeModal}>
                      &times;
                    </span>
                    <h2>NOT ENOUGH BALANCE</h2>
                    <p>You do not have sufficient balance!!</p>
                  </div>
                </div>
              </div>
            )}

            {timeOutModal && (
              <div className="overlay" onClick={closeModal}>
                <div className="popUp">
                  <div className="modalMsg">
                    <span className="close" onClick={closeModal}>
                      &times;
                    </span>
                    <h2>TIME OUT</h2>
                    <p>The bid is over!!</p>
                  </div>
                </div>
              </div>
            )}

            {higherBidModal && (
              <div className="overlay" onClick={closeModal}>
                <div className="popUp">
                  <div className="modalMsg">
                    <span className="close" onClick={closeModal}>
                      &times;
                    </span>
                    <h2>LOWER BID PLACED</h2>
                    <p>Please place a bid higher than {currentBid}!!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bidding;
