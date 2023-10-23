import React, {useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './MarketplacePage.css';
import './styles.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const auctions = [
  {
    id: 1,
    title: 'Vintage Watch',
    image: 'https://cdn.pixabay.com/photo/2018/02/24/20/39/clock-3179167_1280.jpg',
    price: '$150',
    description: 'A beautiful vintage watch from the 1960s.',
    auctioneerName: 'John Doe',
    auctioneerRating: 4.7,
    endTime: new Date().getTime() + 3600000, // End time in milliseconds (1 hour from now)
  },
  {
    id: 2,
    title: 'Oil Painting',
    image: 'https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg',
    price: '$300',
    description: 'An original oil painting by a renowned artist.',
    auctioneerName: 'Jane Smith',
    auctioneerRating: 4.9,
    endTime: new Date().getTime() + 7200000, // End time in milliseconds (2 hours from now)
  },
  {
    id: 3,
    title: 'Antique Furniture',
    image: 'https://cdn.pixabay.com/photo/2017/03/24/14/22/pin-up-girl-2171312_1280.jpg',
    price: '$500',
    description: 'An intricately carved antique furniture piece.',
    auctioneerName: 'Michael Johnson',
    auctioneerRating: 4.5,
    endTime: new Date().getTime() + 10800000, // End time in milliseconds (3 hours from now)
  },
  // Add more dummy auctions as needed
];

const MarketplacePage = () => {
  const [timeLeft, setTimeLeft] = useState([]);

  // Function to format time as "hh:mm:ss"
  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const updatedTimeLeft = auctions.map((auction) => {
        const remainingTime = Math.max(0, Math.floor((auction.endTime - currentTime) / 1000));
        return formatTime(remainingTime);
      });
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <body class="body">
    <div>
      <h2 class="subheader">Marketplace Page</h2>
      {/* Add your marketplace content */}
      <div class="button-container">
      <Form inline>
      <Row>
      <Col xs="auto">
     <Form.Control
      type="text"
      placeholder="Search"
      className=" mr-sm-2"
    />
  </Col>
  <Col xs="auto">
    <Button variant="success" class="submit-button" type="submit">Submit</Button>
  </Col>
</Row>
</Form> 
     <button class="main-button">
     <Link class="header h5" to="/">Back to Home</Link>
     </button>
     </div>
      <div className="auction-list">
        {auctions.map((auction, index) => (
          <div key={auction.id} className="auction-item">
            <div className="auction-box">
              <img src={auction.image} alt={auction.title} />
              <h3>{auction.title}</h3>
              <p className="description">{auction.description}</p>
              <p className="price">{auction.price}</p>
              <div className="auction-details">
                <p>Auctioneer: {auction.auctioneerName}</p>
                <p>Rating: {auction.auctioneerRating}</p>
                <p>Time Remaining: {timeLeft[index]}</p>
              </div>
              <button className="bid-button">Place Bid Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </body>
  );
};

export default MarketplacePage;

/*
https://cdn.pixabay.com/photo/2018/02/24/20/39/clock-3179167_1280.jpg
https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg
https://cdn.pixabay.com/photo/2017/03/24/14/22/pin-up-girl-2171312_1280.jpg
*/