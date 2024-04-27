import React, { useState, useContext } from "react";
//import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../App";
import axios from "axios";
import "../styles/itemForm.css";

function ItemForm() {
  // const location = useLocation();
  // const { acc } = location.state;
  const navigate = useNavigate();
  const account = useContext(AccountContext);
  console.log(account);
  const [formData, setFormData] = useState({
    image: null,
    item_name: "",
    auction_type: "",
    start_bid: "",
    cooldown: "",
    closing_time: "",
    start_time: "",
    owner: account,
    bid_exp: "",
    tags: "",
    // Add more fields as needed
  });
  const [name, setName] = useState("");

  // function imageUpload(e) {
  //   const [image, setImage] = useState("");
  //   function handleImage(e) {
  //     console.log(e.target.files);
  //     setImage(e.target.files[0]);
  //   }
  //   function handleAPI() {
  //     const formData = new FormData();
  //     formData.append("image", image);
  //   }
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "date" || name === "time") {
      // Combine date and time into a single string
      const newDateTime = {
        ...formData,
        datetime: { ...formData.datetime, [name]: value },
      };
      setFormData(newDateTime);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (event) => {
    console.log(event.target.files);
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const binaryString = reader.result;
      console.log("In render function");
      //console.log("In onloadend callback:", binaryString);
      setFormData({
        ...formData,
        image_data: binaryString, // Store the binary data in the formData state
      });
      if (formData.image_data != null) {
        console.log(formData.image_data.slice(0, 100));
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const formDataToSend = new FormData();
    formDataToSend.append("item_name", formData.item_name);
    formDataToSend.append("auction_type", formData.auction_type);
    formDataToSend.append("start_bid", formData.start_bid);
    formDataToSend.append("cooldown", formData.cooldown);
    formDataToSend.append("closing_time", formData.closing_time);
    formDataToSend.append("start_time", formData.start_time);
    formDataToSend.append("owner", account);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("tags", formData.tags);
    formDataToSend.append("bid_exp", formData.bid_exp);
    try {
      // Send form data to backend
      axios
        .post("http://localhost:5000/auction", formDataToSend)
        .then((response) => {
          console.log("Auction created successfully:", response.data);
          setFormData({
            image: null,
            item_name: "",
            auction_type: "",
            start_bid: "",
            cooldown: "",
            closing_time: "",
            start_time: "",
            owner: "",
            bid_exp: "",
            tags: "",
            // Reset other fields as needed
          });
        })
        .catch((error) => {
          console.error("Error creating auction:", error);
        });
      // Optionally, reset the form after submission
    } catch (error) {
      console.error("Error submitting data:", error.message);
      // Handle error (e.g., display error message to user)
    }
    alert("Auction added successfully.");
    navigate('/auctions');
  };

  return (
    <>
      <form action="" className="newItem" onSubmit={handleSubmit}>
        <div className="ColElement" style={{ alignItems: "center" }}>
          <p style={{ width: "150px" }}>Upload Image:</p>
          <input
            type="file"
            className="formElement"
            required
            // onChange={(e) => handleImageChange(e)}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
            // value={formData.image_data}
          />
          {/*<button onClick={handleImageChange}>Check</button>*/}
        </div>
        <div className="colElement">
          <div className="rowElements">
            Item Name:{" "}
            <input
              name="item_name"
              type="text"
              className="formElement"
              required
              onChange={handleChange}
              value={formData.item_name}
            />
          </div>
        </div>
        <div className="ColElement">
          <div className="rowElements">
            Item Category:
            <select
              name="tags"
              className="formElement"
              required
              onChange={handleChange}
              value={formData.tags}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Furniture">Furniture</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Automobiles">Automobiles</option>
              <option value="Automobiles">Electronics</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Art">Art</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="rowElements" required>
            Auction type:
            <select
              name="auction_type"
              className="formElement"
              onChange={handleChange}
              value={formData.auction_type}
              required
            >
              <option disabled value="">
                Select
              </option>
              <option value="English">English</option>
              <option value="Reverse">Reverse</option>
            </select>
          </div>
        </div>
        <div className="ColElement">
          <div className="rowElements">
            Starting bid (Wei):
            <input
              name="start_bid"
              type="number"
              className="formElement"
              required
              onChange={handleChange}
              value={formData.start_bid}
            />
          </div>
        </div>
        <div className="ColElement">
          <div className="rowElements">
            Cooldown Time (Seconds):
            <input
              name="cooldown"
              type="number"
              className="formElement"
              required
              onChange={handleChange}
              value={formData.cooldown}
            />
          </div>
          <div className="rowElements">
            Expiry Time (Seconds):
            <input
              name="bid_exp"
              type="number"
              className="formElement"
              required
              onChange={handleChange}
              value={formData.bid_exp}
            />
          </div>
        </div>
        <div className="ColElement">
          <div className="rowElements">
            Starting Time:
            <input
              name="start_time"
              type="datetime-local"
              className="formElement"
              required
              onChange={(e) => {
                let formattedValue = e.target.value.replace("T", " "); // Replace 'T' with space
                formattedValue = formattedValue.substring(0, 16) + ":00"; // Add seconds
                setFormData({ ...formData, start_time: formattedValue });
              }}
              value={formData.start_time}
            />
          </div>
          <div className="rowElements">
            Closing Time:
            <input
              name="closing_time"
              type="datetime-local"
              className="formElement"
              required
              onChange={(e) => {
                let formattedValue = e.target.value.replace("T", " "); // Replace 'T' with space
                formattedValue = formattedValue.substring(0, 16) + ":00"; // Add seconds
                setFormData({ ...formData, closing_time: formattedValue });
              }}
              value={formData.closing_time}
            />
          </div>
        </div>
        <input type="submit" className="submit" />
      </form>
    </>
  );
}

export default ItemForm;
