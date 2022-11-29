# LW3 Password Vault 🔥🚀

## About Application

### "LW3 Password Vault" is a "EarnWeb3" de-centralized password Manager initialive organized by "LearnWeb3".

- Application Stores your passwords details on chains in a encrypted manner.
- Application uses "LIT Protocol"<pending> to Encrypt, Decrypt and Accesscontrol making it accessible to user's only.
- Application uses "Ceramic Network"<pending> to store User's Encrypted Data in a Tile Document. It helps us to add one more layer of security
- Dynamically generated NFT's are used as access token for Application usage.
- Currently Supporting Goerli and Polygon Mumbai. However more network supports can be configured.

## Demo URL :

## Project Flows and Supporting Screenshots

- Home Page
- Sign-Up Page
  asdf
- Logged-In Page

opensea testnet image to be shared

## Setup

### Smart Contract

A Smart Contract is used to manage user's state.
Currently Password Manager Smart Contract is deployed on

    - Goerli : [0xc406eF5167277Ea05dCDdB9B4B28862Bc2D3F5B9](https://goerli.etherscan.io/address/0xc406ef5167277ea05dcddb9b4b28862bc2d3f5b9)
    - Polygon Mumbai : [0x4e9232bF48dCb7f34903d10B1019EeA02F7681e4](https://mumbai.polygonscan.com/address/0x4e9232bf48dcb7f34903d10b1019eea02f7681e4)

In-case Password Manager contract needs an enhancement, below steps should be followed

1. Create a copy of `./smart-contracts/.env.example` as `.env` and populate all below parameters

```javascript
PRIVATE_KEY = "<DEPLOYERS_PRIVATE_KEY>";
ETHERSCAN_API_KEY = "<ETHERSCAN_API_KEY>";
POLYGONSCAN_API_KEY = "<POLYGONSCAN_API_KEY>";
```

2. While you are in `./smart-contracts` directory, run `npm install` to install all node module dependency

3. While you are in `./smart-contracts` directory, run `npx hardhat deploy --tag all --network goerli` to deploy updated contract on Goerli Network.
   <br>
   Just change the network from `"goerli"` to `"mumbai"` to deploy contract on mumbai network. Mentioned commands does following things
   - Deploy and verify the contract on respective chain/network.
   - Generate Contract's types for easier accessibility.
   - Copy Abi, Network Mapping and Contract Types to frontend directory.

### NestJS Frontend

Password Manager Vault Application is a NEXTJS Application. Below steps needs to followed for deployment

1.  Create a copy of `./frontend/.env.local.example` as `.env.local` and populate all below parameters

```javascript
NEXT_PUBLIC_POLYGONMUMBAI_ALCHEMY_API_KEY = "<POLYGONMUMBAI_ALCHEMY_API_KEY>";
NEXT_PUBLIC_PINATA_API_KEY = "<PINATA_API_KEY>";
NEXT_PUBLIC_PINATA_API_SECRET = "<PINATA_API_SECRET>";
```

2. While you are in `./frontend/` directory, run `npm install` to install all dependency.

3. While you are in `./frontend/` directory, run `npm run dev` to start application in development mode.<br>
   For production, create production build as `npm run build`.

### Netwrok changes

Currently Application supports two networks : `Goerli and Polygon Mumbai`

## Tech-Stacks Used

## Features

asdfads
