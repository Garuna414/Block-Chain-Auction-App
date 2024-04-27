import React, { useState, useEffect, useContext } from "react";
//import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/bidding.css";
import "bootstrap/dist/css/bootstrap.css";
//import img from "../assets/user.png";
import { CurrentBidIdContext } from "../App";
import axios from "axios";
//import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import Web3 from "web3";
// import { Bar } from "react-chartjs-2";
// import Countdown from "react-countdown";
//const API_KEY = "IfcMKJ1zlRSq5vuMiptcgOmAb7IjzIx3";
const CONTRACT_ADDRESS = "0x12b106a460f6867a9ADdc4e4939cD342673EcA41";

const abi = require("../assets/NFTTransferAuction.json");
//const abi = require("../assets/erc721abi.json");
//const network = "sepolia";
// const alchemyProvider = new ethers.AlchemyProvider(network, API_KEY);
// const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const UserBidValueContext = React.createContext();
//const web3 = window.web3;
// const handleTransfer = async (e) => {
//   //e.preventDefault();
//   const data = new FormData(e.target);
//   // const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const web3 = new Web3(web3.currentProvider);
//   const provider = new Web3(web3.currentProvider);
//   await provider.send("eth_requestAccounts", []);
//   const signer = await provider.getSigner();
//   // const erc20 = new ethers.Contract(contractInfo.address, erc20abi, signer);
//   // await erc20.transfer(data.get("recipient"), data.get("amount"));
// };
const ethers = require("ethers");

function Bidding({ acc }) {
  // const location = useLocation();
  // const { item } = location.state;
  const [bidData, setBidData] = useState({
    value: "",
  });
  const userInp = new FormData();
  userInp.append("newValue", bidData.value);
  const { currentBidId } = useContext(CurrentBidIdContext);
  const [bidNum, setBidNum] = useState(currentBidId);
  const [item, setItem] = useState(() => {
    // Use a callback function to conditionally set the initial state
    //const savedItem = Cookies.get("Dkey");
    const savedItem = localStorage.getItem("dkey");
    return savedItem ? savedItem : ""; // Set initial state to the value of the cookie, or an empty string if the cookie doesn't exist
  });
  const navigate = useNavigate();
  const [sellerName, setSellerName] = useState("John Doe");
  const [itemName, setItemName] = useState("");
  const [itemCat, setItemCat] = useState("");
  const [aucType, setAucType] = useState("");
  const [sellerRat, setSellerRat] = useState(4.1);
  const [startBid, setStartBid] = useState("");
  const [currBid, setCurrBid] = useState("");
  const [minIncrValue, setMinIncrValue] = useState(15);
  const [cooldownTime, setCooldownTime] = useState(null);
  const [cooldown, setCooldown] = useState(15);
  const [closingTime, setClosingTime] = useState("");
  const [balance, setBalance] = useState(10000);
  const [userBid, setUserBid] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [lastFiveBids, setLastFiveBids] = useState([]);
  const [sellerAcc, setSellerAcc] = useState("");

  const handleTransfer = async (e) => {
    //e.preventDefault();
    //const data = new FormData(e.target);
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const aucContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        abi.abi,
        signer
      );
      //const toAddress = "0x9fFcEd4E3F28cD486bcD4635fC0899175A4Bc4C5"; // Replace with the recipient's address
      // console.log(typeof(e));
      // const tokenId = e;
      // const weiAmountValue = ethers.utils.parseEther(tokenId);

      // const tx = await erc721.Transfer("0x9f9c8b04312b66074fb9f965ab7393a3bc70a6ff", e);
      // await tx.wait();
      // try {
      //   const tx = await erc721.transferFrom(signer.getAddress(), toAddress, ethers.utils.parseEther(tokenId));
      //   await tx.wait();
      //   return 1;
      // } catch (error) {
      //   console.error("Error transferring ERC721 token:", error);
      //   return 0;
      // }

      try {
        //const amount = ethers.utils.parseEther(userBid);
        // const amount = ethers.utils.parseUnits(userBid, "wei");
        //const amount = ethers.BigNumber.from("150000000000000000");
        //console.log("Amount is:", typeof(amount));
        const amount = parseFloat(userBid);
        const amountWei = ethers.utils.parseUnits(amount.toString(), "wei");
        const tx = await aucContract.placeBid({
          // value: ethers.utils.parseEther(e) // Replace "1.0" with the amount you want to bid
          //value: ethers.utils.formatUnits(amount, 18)
          value: amountWei,
        });
        await tx.wait();
        console.log("Bid placed successfully.");
        return 1;
      } catch (error) {
        console.error("Error placing bid:", error);
      }
    } else {
      console.error("Ethereum provider not found");
      return 0;
    }
  };

  useEffect(() => {
    setBidNum(currentBidId);
  }, []);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        console.log(bidNum);
        const response = await axios.get(
          `http://localhost:5000/auction/${bidNum}`
        );
        setItem(response.data);
        console.log(response);
        setItemName(response.data.item_name);
        setItemCat(response.data.tags);
        setAucType(response.data.auction_type);
        setStartBid(response.data.start_bid);
        setCooldownTime(timeToSeconds(response.data.cooldown));
        setCooldown(cooldownTime);
        setClosingTime(timeToSeconds(response.data.bid_exp));
        //DANGER DO NOT UNCOMMENT
        setSellerAcc(response.data.owner);
        //console.log("Owner is", response.data.owner);
        if (response.data.past_bids !== null) {
          const bidsArray = response.data.past_bids.split(",");
          if (bidsArray.length > 0) {
            if (bidsArray.length < 6) {
              setCurrBid(bidsArray[bidsArray.length - 1]);
              //setLastFiveBids(bidsArray);
              setLastFiveBids(bidsArray.slice(1, bidsArray.length).reverse());
            } else {
              const lastFive = bidsArray
                .slice(bidsArray.length - 5, bidsArray.length)
                .reverse(); // Reverse the sliced array
              setLastFiveBids(lastFive);
              setCurrBid(lastFive[0]); // Update current bid with the first element of the reversed array
            }
          } else {
            setCurrBid(response.data.start_bid);
          }
        }
        else {
          setCurrBid(response.data.start_bid);
        }
        const sellerDataResponse = await axios.get(
          `http://localhost:5000/getUser/${response.data.owner}`
        );
        setSellerName(sellerDataResponse.data.name);
        setSellerRat(sellerDataResponse.data.rating);
      } catch (error) {
        console.error("Error fetching item data:", error.message);
      }
    };
    if (bidNum) {
      fetchItemData();
    }
    console.log("printed");

    //     try {
    //   const response = await axios.get(
    //     `http://localhost:5000/getUser/${account}`
    //   );
    //   console.log(response);
    //   if (response.data.name === "ANONYMOUS") {
    //     // Prompt the user to enter their name
    //     const newName = prompt("");
    //     console.log(typeof(account), typeof(newName));
    //     if (newName) {
    //       // If name is provided, update the user's name
    //       updateUserName(account, newName)
    //         .then((responseData) => {
    //           console.log(responseData);
    //           setName(newName);
    //           // Handle response...
    //         })
    //         .catch((error) => {
    //           // Handle error...
    //           console.error("Error fetching user data:", error.message);
    //         });
    //     }
    //   }
    //   setRating(response.data.rating);
    // } catch (error) {
    //   console.log("error");
    //   console.error("Error fetching data:", error.message);
    // }
  }, []);

  function timeToSeconds(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  useEffect(() => {
    if (!cooldown) return;
    const intervalId = setInterval(() => {
      setCooldown(cooldown - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cooldown]);

  const checkBid = () => {
    console.log(userBid, currBid);
    if (cooldown > 0) {
      alert("Bid cooldown not reached.");
      // } else if (parseFloat(userBid) > balance) {
      //   alert("Insufficient balance.");
    } else if (parseFloat(userBid) == null || userBid == 0) {
      alert("Bid value cannot be empty.");
    } else if (parseFloat(userBid) - parseFloat(currBid) < minIncrValue) {
      alert("Minimum bid increment not fulfilled.");
    } else if (parseFloat(userBid) < parseFloat(currBid)) {
      alert("Input value less than current bid.");
    } else if (parseFloat(userBid) > parseFloat(currBid)) {
      // alert("Bid placed successfully.");
      setCurrBid(userBid);
      // setBalance(balance - userBid);
      setCooldown(cooldownTime);
      // console.log(currBid);
      // console.log(userBid);
      // console.log(balance);
      return true;
    }    
    console.log("Bid cannot be verified");
  };

  function calculateRating(rating, action) {
    let activity = 5 * Math.atanh(rating / 2.5 - 1);
    if (action === true) {
      activity = activity + 1;
    } else {
      activity = activity - 1;
    }
    let result = 2.5 * Math.tanh(activity / 5) + 2.5;
    return Math.round(result * 100) / 100;
  }

  const updateBids = () => {
    setCurrBid(userBid);
    setBalance(balance - userBid);
    setCooldown(cooldownTime);
  };

  const bidVerify = async () => {
    if (checkBid() && (await handleTransfer(userBid))) {
      updateBids();
      try {
        // Make POST request to update past bids
        console.log("Sending data:", currentBidId, userBid);
        axios.post(
          `http://localhost:5000/auctions/update-past-bids/${currentBidId}/${userBid}` // Send newValue in the request body
        );
        setLastFiveBids(lastFiveBids.reverse());
        lastFiveBids.push(userBid);
        setLastFiveBids(lastFiveBids.reverse());
        if (lastFiveBids.length > 5) {
          lastFiveBids.pop();
        }
        alert("Bid placed successfully.");
        // After successful bid submission, fetch last 5 bids
        // const response = await axios.get(`/auctions/last-five-bids/${currentBidId}`);
        // setLastFiveBids(response.data);
        updateBids();
      } catch (error) {
        console.error("Error submitting bid:", error);
        // Handle error
      }
    }
  };

  function getImage(photo) {
    if (!photo) return ""; // Return empty string if photo is undefined

    // Convert the array of integers to Uint8Array
    const uint8Array = new Uint8Array(photo);

    // Create a Blob from the Uint8Array
    const blob = new Blob([uint8Array], { type: "image/png" });

    // Create a URL for the Blob
    return URL.createObjectURL(blob);
  }

  const handleMouseOver = (e) => {
    const image = e.target;
    const zoomFactor = 2; // Adjust this value to control the zoom level
    const offsetX = e.nativeEvent.offsetX;
    const offsetY = e.nativeEvent.offsetY;
    const imageWidth = image.offsetWidth;
    const imageHeight = image.offsetHeight;

    const x = (offsetX / imageWidth) * 100;
    const y = (offsetY / imageHeight) * 100;

    image.style.transformOrigin = `${x}% ${y}%`;
    image.style.transform = `scale(${zoomFactor})`;
  };

  const handleMouseOut = (e) => {
    const image = e.target;
    image.style.transform = "scale(1)";
  };

  useEffect(() => {
    console.log("Cookie Saved:", item);
    //Cookies.set("Dkey", item);
    localStorage.setItem("dkey", item);
  }, [item]);

  const endAuc = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const aucContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        abi.abi,
        signer
      );
      try {
        const sellerWalletAdd = await aucContract.auctioneer();
        const highestBidderAdd = await aucContract.highestBidder();

        console.log(
          "Auctioneer Acc, Buyer Acc",
          sellerWalletAdd,
          highestBidderAdd
        );
        //----Rating Start
        const auctioneerResponseData = await axios.get(
          `http://localhost:5000/getUser/${sellerWalletAdd}`
        );
        const hBidderResponseData = await axios.get(
          `http://localhost:5000/getUser/${highestBidderAdd}`
        );
        const result1 = calculateRating(
          auctioneerResponseData.data.rating,
          true
        );
        setSellerRat(result1);
        const result2 = calculateRating(hBidderResponseData.data.rating, true);
        console.log("Updated ratings are:", typeof result1, typeof result2);
        axios
          .post(
            `http://localhost:5000/updateReputation/${sellerWalletAdd}/${result1}`
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
        axios
          .post(
            `http://localhost:5000/updateReputation/${highestBidderAdd}/${result2}`
          )
          .then((response) => {
            console.log(response.data); // Output: Reputation updated successfully
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });

        //----Rating End
        const tx = await aucContract.finalizeAuction();
        await tx.wait();
        alert("Auction ended");
        axios
          .delete(`http://localhost:5000/deleteAuction/${bidNum}`)
          .then((response) => {
            console.log("Auction deleted"); // Output: Reputation updated successfully
          })
          .catch((error) => {
            console.error("Cannot delete:", error.message);
          });
        navigate("/auctions");
      } catch (error) {
        console.error("Cannot end auction:", error);
      }
    } else {
      console.error("Ethereum provider not found");
      return 0;
    }
  };

  return (
    <>
      <UserBidValueContext.Provider value={{ userBid, setUserBid }}>
        <div className="mainData">
          <p className="sub-heading">Bidding</p>
          <div className="bidBox">
            <div className="imgGraph">
              <div className="bidImgBox">
                {item.image_data && (
                  <img
                    src={getImage(item.image_data.data)}
                    alt=""
                    className="bidImg"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  />
                )}
              </div>
              <div className="bidBasicInfo">
                <p className="bidData">
                  Seller Name: <b>{sellerName}</b>
                </p>
                <p className="bidData">
                  Item Name: <b>{itemName}</b>
                </p>
                <p className="bidData">
                  Item Catagory: <b>{itemCat}</b>
                </p>
                <p className="bidData">
                  Auction Type: <b>{aucType}</b>
                </p>
                <p className="bidData">
                  Seller Rating: <b>{sellerRat}</b>
                </p>
              </div>
            </div>
            <hr />
            <div className="bidderList">
              {/* <div className="highestBid">
              <p className="bidData">Highest Bid</p>
              <div className="bidder">
                <div className="bidderNameBox">
                  <p className="bidderName">Bidr 3</p>
                </div>
                <div className="bidValueBox">
                  <p className="bidValue">30.00</p>
                </div>
              </div>
            </div> */}
              <ol type="I" className="pastBids">
                {lastFiveBids.map((bid, index) => (
                  <li key={index} className="pastBid">
                    {bid} Wei
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="statsData">
          <p className="sub-heading">Bidders</p>
          <div className="bidInfoBox">
            <p className="bidData">
              Starting Bid: <b>{startBid}</b>
            </p>
            <p className="bidData">
              Current Bid: <b>{currBid}</b>
            </p>
            <p className="bidData">
              Cooldown Time: <b>{cooldownTime}</b>
            </p>
            <p className="bidData">
              Closing Time: <b>{closingTime}</b>
            </p>
            <p className="bidData">
              Minimum bid increment: <b>{minIncrValue}</b>
            </p>
            <p className="bidData">
              Next bid available in <b>{cooldown}s</b>
            </p>
            <p className="bidData">
              Bid closing in <b>{closingTime}s</b>
            </p>
            <div className="bidInput">
              <input
                name="value"
                required
                type="number"
                className="userInp"
                placeholder={0}
                value={userBid}
                //onChange={(e) => setUserBid(e.target.value)}
                onChange={(e) => {
                  setUserBid(e.target.value);
                  setBidData({ ...bidData, value: userBid });
                }}
              />
              <button
                className="submit"
                onClick={bidVerify}
                disabled={acc == sellerAcc}
              >
                Submit
              </button>
              {console.log("Seller account is:", sellerAcc)}
              <button
                className="submit"
                disabled={acc != sellerAcc}
                onClick={endAuc}
              >
                End Auction
              </button>
            </div>
          </div>
        </div>
      </UserBidValueContext.Provider>
    </>
  );
}

export default Bidding;
export const useCurrentBidValue = () => useContext(UserBidValueContext);
