# BidChainX

## Description

BidChainX is a blockchain-based auction platform built using React, allowing users to place bids while maintaining anonymity within the auction process. The platform utilizes Metamask for wallet services and transactions, ensuring secure and transparent bidding.

## Features

- **Anonymity**: Users can place bids anonymously, ensuring privacy throughout the auction process.
- **Wallet Integration**: Utilizes Metamask for seamless wallet services and secure transactions.
- **User Registration**: New users are prompted to provide a name for their corresponding wallet address upon registration.
- **Rating System**: Implements a rating system that assigns a default rating of 2.5 to new users, which increases with each successful auction participation, promoting trust within the community.
- **Auction Control**: Auctioneers have the privilege of prematurely ending auctions if necessary.
- **Token Transfer**: Upon the conclusion of an auction, the ERC721 token representing ownership of the auction item is transferred to the highest bidder, while the auctioneer receives the intended payment.

## Technologies Used

- React
- Metamask
- ERC721 token standard
- phpMyAdmin
- XAMPP server

## Installation

1. Clone the repository: `git clone [<repository-url>](https://github.com/Garuna414/Block-Chain-Auction-App)`
2. Install dependencies: `npm install`
3. Run the development server: `npm start`

## Usage

1. Ensure Metamask is installed and set up.
2. Navigate to the BidChainX website.
3. Register or log in to your account.
4. Browse available auctions or create a new one.
5. Place bids on desired items.
6. Monitor auction progress and interact with other users anonymously.
7. Auctioneers can end auctions prematurely if needed.
8. Upon auction completion, the ERC721 token ownership is transferred to the highest bidder, and the auctioneer receives the payment.


## License

This project is licensed under the [MIT License](LICENSE).
