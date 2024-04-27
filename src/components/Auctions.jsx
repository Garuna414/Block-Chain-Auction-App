import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/auctions.css";
import { CurrentBidIdContext } from "../App";
import img from "../assets/user.png";

function Auctions() {
  // const [isFormOpen, setIsFormOpen] = useState(false);

  // const formRef = React.createRef();

  // function openForm() {
  //   setIsFormOpen(true);
  // }

  // function closeForm() {
  //   setIsFormOpen(false);
  // }
  const { currentBidId, setCurrentBidId } = useContext(CurrentBidIdContext);

  const [items, setItems] = useState([]);
  const [imageData, setImageData] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [searchItem, setSearchItem] = useState("default");
  const [selectedTag, setSelectedTag] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //console.log("Working");
    // Fetch data from backend endpoint
    // axios
    //   .get("http://localhost:5000/auctions/non-finished")
    //   .then((response) => {
    //     // Set item data in state
    //     setItems(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching auction items:", error);
    //   });
    fetchData();
  }, []);

  // const blobToBase64 = (blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //   });
  // };

  // async function parseURI(d) {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(d);
  //   return new Promise((res, rej) => {
  //     reader.onload = (e) => {
  //       res(e.target.result);
  //     };
  //   });
  // }

  //var base64img = parseURI(blob);

  // async function getDataBlob(url) {
  //   var res = await fetch(url);
  //   var blob = await res.blob();
  //   var base64img = await parseURI(blob);
  //   console.log(base64img);
  // }

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/auctions/non-finished/search",
        {
          params: {
            name: searchItem,
          },
        }
      );
      setItems(response.data);
      //console.log("Items are:", response.data);
    } catch (error) {
      console.error("Error searching auctions:", error);
    } finally {
      // Use setTimeout to ensure loading screen shows for at least 1 second
      setTimeout(() => {
        setLoading(false); // Hide loading screen after 1 second
      }, 250);
    }
  };

  const fetchData = async (tag) => {
    try {
      setLoading(true);
      let url = "http://localhost:5000/auctions/non-finished";
      if (tag) {
        url += `/${tag}`;
      }
      //console.log(url);
      const response = await axios.get(url);
      setItems(response.data);
      //console.log("response", response.data);
      response.data.forEach((item) => {
        //console.log("image_data");
        //console.log(item.image_data.data); // Access image_data property of each item
      });
    } catch (error) {
      console.error("Error fetching auction items:", error);
    } finally {
      // Use setTimeout to ensure loading screen shows for at least 1 second
      setTimeout(() => {
        setLoading(false); // Hide loading screen after 1 second
      }, 250);
    }
  };

  function setBlobImages(photo) {
    const blob = new Blob([photo], { type: "image/jpeg" }); // Create Blob object
    return URL.createObjectURL(blob); // Convert Blob to URL
  }

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
    //console.log(event.target.value);
    fetchData(event.target.value);
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

  // useEffect(() => {
  //   // Convert image data to base64 for each item
  //   const convertImageDataToBase64 = async () => {
  //     const updatedItems = await Promise.all(
  //       items.map(async (item) => {
  //         let base64Image;
  //         if (item.image_data instanceof Blob) {
  //           base64Image = await blobToBase64(item.image_data);
  //         } else {
  //           // Handle if image_data is already base64 or not present
  //           base64Image = item.image_data;
  //         }
  //         return { ...item, base64Image };
  //       })
  //     );
  //     setItems(updatedItems);
  //   };

  //   convertImageDataToBase64();
  // }, [items]);

  /*
  
  useEffect(() => {
    console.log("Working");
    // Fetch data from backend endpoint
    axios
      .get("http://localhost:5000/auctions/non-finished")
      .then((response) => {
        // Set item data in state
        setItems(response.data);
        setBlob(response.data.image_data);
        console.log(response.data.image_data);
  
        // Assuming imageData is part of the response data
        const imageData = response.data.imageData;
  
        // Parse the JSON string to extract the image data array
        const imageDataArray = JSON.parse(imageData).image_data.data;
  
        // Convert the array of integers to a Uint8Array
        const uint8Array = new Uint8Array(imageDataArray);
  
        // Create a Blob from the Uint8Array
        const blob = new Blob([uint8Array], { type: 'image/png' }); // Adjust the type according to the image format if needed
  
        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(blob);
  
        // Create an Image element and set its source to the Blob URL
        const img = new Image();
        img.src = blobUrl;
  
        // Append the Image element to the document body or any other container
        document.body.appendChild(img);
  
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching auction items:", error);
      });
  }, []);
  
  */

  const handleItemClick = (bidId) => {
    setCurrentBidId(bidId); // Update the currentBidId when an item card is clicked
    console.log(bidId);
  };

  return (
    <>
      <div className="mainBidData">
        <div className="search">
          <p className="sub-heading">Auctions</p>
          <form className="form-inline" style={{ height: "50px" }}>
            <select required value={selectedTag} onChange={handleTagChange}
            className="filterBtn">
              <option value="" defaultChecked>
                Select
              </option>
              <option value="Furniture">Furniture</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Automobiles">Automobiles</option>
              <option value="Electronics">Electronics</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Art">Art</option>
              <option value="Other">Other</option>
            </select>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              id="searchBtn"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
        <div className="itemContainer">
          {items.map((item) => (
            // <div key={item.auction_id}>
            //   <p>{item.item_name}</p>
            //   <p>Auction Type: {item.auction_type}</p>
            //   <p>Start Bid: {item.start_bid}</p>
            //   {/* Render image from base64 */}
            //   <img src={item.base64Image} alt={item.item_name} />
            //   {/* Add more details as needed */}
            // </div>
            <Link
            to={{
              pathname: "/bidding",
              state: { prop: item }
            }}
              className="bidLink"
              key={item.auction_id}
              onClick={() => handleItemClick(item.auction_id)}
              
            >
              {console.log(item)}
              <div className="item1">
                <div className="img">
                  <img
                    // src={"data:image/png;base64," + setBlobImages(item.image_data.data)}
                    src={getImage(item.image_data.data)}
                    alt={item.item_name}
                  />
                </div>

                <div className="itemInfo">
                  <p className="data">{item.item_name}</p>
                  <p className="data">{item.tags}</p>
                  <p className="data">{item.auction_type}</p>
                  <p className="data">
                    {new Date(item.closing_time).toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}

          {/* <Link to="/bidding" className="bidLink">
            <div className="item1">
              <div className="img">
                <img src={img} className="itemImg" alt="" />
              </div>

              <div className="itemInfo">
                <p className="data">Item name</p>
                <p className="data">Category</p>
                <p className="data">Auction type</p>
                <p className="data">Closing Time</p>
              </div>
            </div>
          </Link> */}
        </div>
        {loading && (
          <div className="mktLoading">
            <h1>Loading...</h1>
          </div>
        )}
      </div>
      {/* <div className="statsData">
        <p className="sub-heading">Statistics</p>
        <button className="btn btn-success" onClick={() => openForm()}>
          Add Auction
        </button>
      </div>
      {isFormOpen && (
        <div className="itemForm" ref={formRef}>
          <button className="closeBtn" onClick={() => closeForm()}>
            X
          </button>
          <form className="form">
            Upload Image: <input type="file" />
            Item name: <input type="text" placeholder="Ex: Wooden Chair" />
            Item category:
            <select>
              <option selected>Select</option>
              <option>Furniture</option>
              <option>Jewelry</option>
              <option>Automobiles</option>
              <option>Electronics</option>
              <option>Real Estate</option>
              <option>NFT</option>
              <option>Other</option>
            </select>
            Auction type:
            <select>
              <option selected>Select</option>
              <option>English</option>
              <option>Reverse</option>
            </select>
            Starting bid (ETH):
            <input type="number" placeholder="Ex: 5.9" />
            <input type="submit" className="submit" />
          </form>
        </div>
      )} */}
    </>
  );
}

export default Auctions;
