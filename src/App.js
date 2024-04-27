import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navigation from "./components/Navigation";
import Expenses from "./components/Expenses";
import Earnings from "./components/earnings";
import Wallet from "./components/wallet";
import Auctions from "./components/Auctions";
import Bidding from "./components/Bidding";
import Navbar from "./components/Navbar";
import Web3 from "web3";
import ItemForm from "./components/ItemForm";
import Landing from "./components/Landing";

export const AccountContext = createContext();
export const CurrentBidIdContext = createContext(null);

function App() {
  // const navigate = useNavigate();
  // const location = useLocation();
  const [account, setAccount] = useState("");
  const [currentBidId, setCurrentBidId] = useState(null);
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAccountsChanged = async (newAccounts) => {
      console.log("MetaMask accounts changed:", newAccounts);
      var newAccount = newAccounts[0];
      window.location.reload();
      window.location.href = "http://localhost:3000/";
      setAccount(newAccount);
      //console.log(newAccount);
      //console.log(newAccounts[0]);
      setBalance(await getBalance(newAccount));

      // Send GET request to your database using Axios

      // const pr                                        eviousUrl = location.pathname;
      try {
        // var url = `http://localhost:5000/getUser/${newAccounts[0]}`;
        //console.log("HELLO");
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/getUser/${newAccount}`
        );
        // const { name, rating } = response.data;
        // setAccount(account);
        console.log(response.data);

        //setName(response.data.name);
        setRating(response.data.rating);
        console.log(name);
        console.log(response.data.rating);
        // console.log(url);
        // setName(name);
        // setRating(rating);
        //console.log("Data from database:", response.data);
        // navigate(previousUrl);
        // Process the data as needed
      } catch (error) {
        console.log("error");
        console.error("Error fetching data:", error.message);
      } finally {
        // Use setTimeout to ensure loading screen shows for at least 1 second
        setTimeout(() => {
          setLoading(false); // Hide loading screen after 1 second
        }, 250);
      }
    };

    console.log(typeof account);

    // const url = `http://localhost:5000/getUser/${encodeURIComponent(account)}`;

    // axios
    //   .get(url)
    //   .then((response) => {
    //     console.log("User data:", response.data);
    //   })
    //   .catch((error) => {
    //     if (
    //       error.response &&
    //       error.response.status === 400 &&
    //       error.response.data === "Name is required"
    //     ) {
    //       const name = prompt("Please enter your name:"); // Display popup to enter name
    //       if (name) {
    //         // Send another request with the provided name
    //         axios
    //           .get(`${url}?name=${encodeURIComponent(name)}`)
    //           .then((response) => {
    //             console.log("User data:", response.data);
    //           })
    //           .catch((error) => {
    //             console.error("Error fetching user data:", error.message);
    //           });
    //       } else {
    //         console.error("Name is required");
    //       }
    //     } else {
    //       console.error("Error fetching user data:", error.message);
    //     }
    //   });

    //Function to fetch user data based on wallet ID
    // const fetchUserData = async (walletId) => {
    //   try {
    //     const response = await axios.get(`http://localhost:5000/getUser/${walletId}`);
    //     if (response) {
    //       console.log(response);
    //     }
    //     return response.data;
    //   } catch (error) {
    //     console.error('Error fetching user data:', error.message);
    //     throw error;
    //   }
    // };

    // // Function to update user's name

    // Fetch user data using getUser API
    // fetchUserData(account)
    //   .then(userData => {
    //     console.log('User data:', userData);

    //     // Check if the user has default name 'ANONYMOUS'
    //     if (userData.name === 'ANONYMOUS') {
    //       // Prompt the user to enter their name
    //       const newName = prompt('');
    //       if (newName) {
    //         // If name is provided, update the user's name
    //         updateUserName(account, newName)
    //           .then(responseData => {
    //             console.log(responseData);
    //             // Handle response...
    //           })
    //           .catch(error => {
    //             // Handle error...
    //             console.error("Error fetching user data:", error.message);
    //           });
    //       } else {
    //         console.log('No name provided.');
    //       }
    //     } else {
    //       // User already has a name
    //       console.log('User has a name:', userData.name);
    //     }
    //   })
    //   .catch(error => {
    //     // Handle error...
    //     console.error("Error fetching user data:", error.message);
    //   });

    // GET request to fetch user data

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.off("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  // useEffect(() => {
  //   console.log(account);
  // }, []);

  useEffect(() => {
    const loadWeb3AndData = async () => {
      const connected = await loadWeb3();

      if (connected) {
        await loadBlockchainData();
      }
    };

    loadWeb3AndData();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      try {
        setLoading(true);
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          // Accounts already granted, use them
          window.web3 = new Web3(window.ethereum);
          console.log(window.web3);
          setLoading(false);
          return true;
        } else {
          // No accounts, request access
          await window.ethereum.request({ method: "eth_requestAccounts" });
          window.web3 = new Web3(window.ethereum);
          return true;
        }
      } catch (error) {
        console.error("Error requesting accounts:", error);
      } finally {
        // Use setTimeout to ensure loading screen shows for at least 1 second
        setTimeout(() => {
          setLoading(false); // Hide loading screen after 1 second
        }, 250);
      }
    } else {
      alert("No metamask detected!!");
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    const updateUserName = async (walletId, newName) => {
      try {
        const response = await axios.post("http://localhost:5000/updateName", {
          wallet_id: walletId,
          name: newName,
        });
        console.log("Name updated successfully");
        return response.data;
      } catch (error) {
        console.error("Error updating name:", error.message);
        throw error;
      }
    };
    const accounts = await web3.eth.getAccounts();
    //console.log(accounts);
    var account = accounts[0];
    setAccount(account);
    setBalance(await getBalance(account));
    try {
      const response = await axios.get(
        `http://localhost:5000/getUser/${account}`
      );
      setName(response.data.name);
      console.log(response);
      if (response.data.name === "ANONYMOUS") {
        // Prompt the user to enter their name
        const newName = prompt("");
        console.log(typeof account, typeof newName);
        if (newName) {
          // If name is provided, update the user's name
          updateUserName(account, newName)
            .then((responseData) => {
              console.log("Response data", responseData);
              setName(newName);
              // Handle response...
            })
            .catch((error) => {
              // Handle error...
              console.error("Error fetching user data:", error.message);
            });
        }
      }
      setRating(response.data.rating);
    } catch (error) {
      console.log("error");
      console.error("Error fetching data:", error.message);
    }
    console.log(account);
  }

  async function getBalance(account) {
    const web3 = window.web3;
    const balanceInWei = await web3.eth.getBalance(account);
    const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");
    return balanceInEth;
  }

  const [display, setDisplay] = useState("block");
  const [marginLeft, setMarginLeft] = useState("0");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleWidth = () => {
    setIsExpanded(!isExpanded);
    setDisplay(isExpanded ? "block" : "none");
    setMarginLeft(isExpanded ? "0" : "150px");
  };

  return (
    <CurrentBidIdContext.Provider value={{ currentBidId, setCurrentBidId }}>
      <AccountContext.Provider value={account}>
        <BrowserRouter>
          <div className="topContainer">
            <Navbar onButtonClick={toggleWidth} />
          </div>
          {/* <div className="homeContainer">
            <Routes></Routes>
          </div> */}
          <div className="mainContainer">
            <div className="leftContainer" style={{ display: display }}>
              {rating != null && (
                <Navigation
                  name={name}
                  account={account}
                  balance={balance}
                  rating={rating}
                />
              )}
            </div>
            <div className="rightContainer" style={{ marginLeft: marginLeft }}>
              <Routes>
                <Route exact path="/expenses" element={<Expenses />}></Route>
                <Route exact path="/earnings" element={<Earnings />}></Route>
                <Route exact path="/wallet" element={<Wallet />}></Route>
                <Route exact path="/auctions" element={<Auctions />}></Route>
                <Route
                  exact
                  path="/bidding"
                  element={<Bidding acc={account} />}
                ></Route>
                <Route exact path="/newItem" element={<ItemForm />}></Route>
                <Route exact path="/" element={<Landing />}></Route>
              </Routes>
            </div>
          </div>
          {loading && (
            <div className="appLoading">
              <h1>Loading...</h1>
            </div>
          )}
        </BrowserRouter>
      </AccountContext.Provider>
    </CurrentBidIdContext.Provider>
  );
}

export default App;
export const useCurrentBidId = () => useContext(CurrentBidIdContext);
