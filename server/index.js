// // ENV vars
// require('dotenv').config()

// // Import dependencies
// const express = require('express')
// const router = require('./routes')
// const Session = require('express-session')

// // Create an app
// const app = express()
// app.use(express.json())

// // Configure app
// app.use(
//   Session({
//     name: 'siwe-quickstart',
//     secret: 'siwe-quickstart-secret',
//     resave: true,
//     saveUninitialized: true,
//     cookie: { secure: false, sameSite: true },
//   })
// )
// app.use(express.static(__dirname + '/public'))
// app.use(router)

// // Start app
// app.listen(process.env.PORT)

// import cors from 'cors';
// import express from 'express';
// import Session from 'express-session';
// import { generateNonce, SiweMessage } from 'siwe';

// const app = express();
// app.use(express.json());
// app.use(cors({
//     origin: 'http://localhost:7545',
//     credentials: true,
// }))

// app.use(Session({
//     name: 'siwe-quickstart',
//     secret: "siwe-quickstart-secret",
//     resave: true,
//     saveUninitialized: true,
//     cookie: { secure: false, sameSite: true }
// }));

// app.get('/nonce', async function (req, res) {
//     req.session.nonce = generateNonce();
//     res.setHeader('Content-Type', 'text/plain');
//     res.status(200).send(req.session.nonce);
// });

// app.post('/verify', async function (req, res) {
//     try {
//         if (!req.body.message) {
//             res.status(422).json({ message: 'Expected prepareMessage object as body.' });
//             return;
//         }

//         let SIWEObject = new SiweMessage(req.body.message);
//         const { data: message } = await SIWEObject.verify({ signature: req.body.signature, nonce: req.session.nonce });

//         req.session.siwe = message;
//         req.session.cookie.expires = new Date(message.expirationTime);
//         req.session.save(() => res.status(200).send(true));
//     } catch (e) {
//         req.session.siwe = null;
//         req.session.nonce = null;
//         console.error(e);
//         switch (e) {
//             case ErrorTypes.EXPIRED_MESSAGE: {
//                 req.session.save(() => res.status(440).json({ message: e.message }));
//                 break;
//             }
//             case ErrorTypes.INVALID_SIGNATURE: {
//                 req.session.save(() => res.status(422).json({ message: e.message }));
//                 break;
//             }
//             default: {
//                 req.session.save(() => res.status(500).json({ message: e.message }));
//                 break;
//             }
//         }
//     }
// });

// app.get('/personal_information', function (req, res) {
//     if (!req.session.siwe) {
//         res.status(401).json({ message: 'You have to first sign_in' });
//         return;
//     }
//     console.log("User is authenticated!");
//     res.setHeader('Content-Type', 'text/plain');
//     res.send(`You are authenticated and your address is: ${req.session.siwe.address}`);
// });

// app.listen(7545);

// Import dependencies
const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const fs = require("fs");
const cors = require('cors');
const port = 5000;

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}



const db = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "123456789",
  database: "dbase",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Mysql Connected!");
});

const app = express();

app.use(cors(corsOptions));
// const upload1 = multer();
// app.use(upload1.none());

app.get("/createtable", (req, res) => {
  let sql =
    "CREATE TABLE users(user_id int AUTO_INCREMENT, wallet_id VARCHAR(42) ,name VARCHAR(50) ,rating float ,PRIMARY KEY(user_id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("table created..");
  });
});

app.get("/getUser/:wallet_id", async (req, res) => {
  const { wallet_id } = req.params;

  db.query(
    "SELECT * FROM users WHERE wallet_id = ?",
    [wallet_id],
    (err, results) => {
      if (err) {
        res.status(500).send("Error fetching user");
        return;
      }

      if (results.length > 0) {
        res.json(results[0]);
      } else {
        // User not found, create a new user with default reputation rating
        const defaultReputation = 2.5; // Set default reputation rating
        const defaultName = 'ANONYMOUS'; // Set default name

        db.query(
          "INSERT INTO users (name, wallet_id, rating) VALUES (?, ?, ?)",
          [defaultName, wallet_id, defaultReputation],
          (err, results) => {
            if (err) {
              res.status(500).send("Error creating user");
              return;
            }
            res.json({ name: defaultName, wallet_id, rating: defaultReputation });
          }
        );
      }
    }
  );
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

app.post('/updateName', (req, res) => {
  const { wallet_id, name } = req.body;

  if (!wallet_id || !name) {
    return res.status(400).send('Wallet ID and new name are required.');
  }

  const sql = 'UPDATE users SET name = ? WHERE wallet_id = ?';

  db.query(sql, [name, wallet_id], (err, result) => {
    if (err) {
      console.error('Error updating name in database: ', err);
      return res.status(500).send('Error updating name in database');
    }
    console.log('Name updated successfully:', result);
    res.status(200).send('Name updated successfully');
  });
});

// POST Request: Update reputation rating of a user
app.post('/updateReputation/:wallet_id/:rating', (req, res) => {
  const rating = req.params.rating;
  const wallet_id  = req.params.wallet_id;

  db.query('UPDATE users SET rating = ? WHERE wallet_id = ?', [rating, wallet_id], (err, results) => {
      if (err) {
          res.status(500).send('Error updating reputation');
          return;
      }
      res.send('Reputation updated successfully');
  });
});

app.get("/createauctions", (req, res) => {
  let sql =
    "CREATE TABLE Auctions (auction_id INT AUTO_INCREMENT PRIMARY KEY,image_data LONGBLOB,item_name VARCHAR(255),auction_type VARCHAR(50),start_bid INT,cooldown TIME,closing_time TIMESTAMP,start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,owner VARCHAR(255), win_time TIME, tags VARCHAR(255));";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("auction table created..");
  });
});

app.get("/auction/:id", (req, res) => {
  const auctionId = req.params.id;

  // Construct the SELECT query to fetch the auction item by ID
  const query = "SELECT * FROM Auctions WHERE auction_id = ?";

  // Execute the query to retrieve the auction item from the database
  db.query(query, [auctionId], (err, results) => {
    if (err) {
      console.error("Error retrieving auction item from database: ", err);
      return res
        .status(500)
        .send("Error retrieving auction item from database");
    }

    // Check if auction item with the provided ID exists
    if (results.length === 0) {
      return res.status(404).send("Auction item not found");
    }

    // Send the auction item as JSON response
    res.status(200).json(results[0]);
  });
});

const upload = multer({ dest: "uploads/" });

app.post('/auction', upload.single('image'), (req, res) => {
  const auctionData = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).send('No image uploaded.');
  }

  // Read the image file
  const imageData = fs.readFileSync(image.path);

  // Construct the INSERT query
  const query = 'INSERT INTO Auctions (image_data, item_name, auction_type, start_bid, cooldown, closing_time, start_time, owner, bid_exp, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  // Execute the query to insert the auction data into the database
  db.query(query, [imageData, auctionData.item_name, auctionData.auction_type, auctionData.start_bid, auctionData.cooldown, auctionData.closing_time, auctionData.start_time, auctionData.owner, auctionData.bid_exp, auctionData.tags], (err, result) => {
    if (err) {
      console.error('Error inserting auction into database: ', err);
      return res.status(500).send('Error inserting auction into database');
    }
    console.log('Auction inserted successfully:', result);
    res.status(200).send('Auction uploaded successfully');
  });
});

app.get('/auctions/non-finished', (req, res) => {
  // Construct the SELECT query
  const query = 'SELECT * FROM Auctions WHERE closing_time > CURRENT_TIMESTAMP ORDER BY closing_time ASC';

  // Execute the query to retrieve non-finished auctions from the database
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving non-finished auctions from database: ', err);
      return res.status(500).send('Error retrieving non-finished auctions from database');
    }

    // Send the non-finished auctions as JSON response
    res.status(200).json(results);
  });
});

app.get('/auctions/non-finished/search', (req, res) => {
  // Extract the searched name from the query parameters
  const searchedName = req.query.name;

  // Construct the SELECT query
  const query = 'SELECT * FROM Auctions WHERE item_name LIKE ? AND closing_time > CURRENT_TIMESTAMP ORDER BY closing_time ASC';

  // Execute the query to retrieve non-finished auctions with names similar to the searched name from the database
  db.query(query, [`${searchedName}%`], (err, results) => {
    //idhar se '%' udda dia agar sub string chahie to add karlena '$' ke pehle

    if (err) {
      console.error('Error retrieving non-finished auctions from database: ', err);
      return res.status(500).send('Error retrieving non-finished auctions from database');
    }

    // Send the retrieved non-finished auctions as JSON response
    res.status(200).json(results);
  });
});

app.get('/auctions/non-finished/:tag', (req, res) => {
  const auctionTag = req.params.tag;

  // Construct the SELECT query
  const query = 'SELECT * FROM Auctions WHERE tags = ? AND closing_time > CURRENT_TIMESTAMP ORDER BY closing_time ASC';

  // Execute the query to retrieve non-finished auctions with the specified name from the database
  db.query(query, [auctionTag], (err, results) => {
    if (err) {
      console.error('Error retrieving non-finished auctions with specified name from database: ', err);
      return res.status(500).send('Error retrieving non-finished auctions with specified name from database');
    }

    // Send the non-finished auctions with specified name as JSON response
    res.status(200).json(results);
  });
});

// Route to update past bids for a specific auction
app.post('/auctions/update-past-bids/:id/:newValue', (req, res) => {
  //if (!req.body) return;
  const auctionId = req.params.id;
  const newValue = req.params.newValue;


  // Construct the UPDATE query
  const query = 'UPDATE Auctions SET past_bids = CONCAT(IFNULL(past_bids, ""), ?) WHERE auction_id = ?';

  // Execute the query to update past bids for the specified auction
  db.query(query, [ ',' + newValue , auctionId], (err, result) => {
    if (err) {
      console.error('Error updating past bids for auction: ', err);
      return res.status(500).send('Error updating past bids for auction');
    }

    // Check if any rows were affected by the update
    if (result.affectedRows === 0) {
      return res.status(404).send('Auction not found');
    }

    // Send a success response
    res.status(200).send('Past bids updated successfully');
  });
});

app.delete('/deleteAuction/:auctionId', (req, res) => {
  const { auctionId } = req.params;

  db.query('DELETE FROM auctions WHERE auction_id = ?', [auctionId], (err, results) => {
    if (err) {
      console.error('Error deleting auction:', err);
      res.status(500).send('Error deleting auction');
      return;
    }
    console.log('Auction deleted successfully');
    res.status(200).send('Auction deleted successfully');
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
