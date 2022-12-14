# LW3 Password Vault 🔥🚀

## About Application

### "LW3 Password Vault" is a "EarnWeb3" de-centralized password Manager initialive organized by "LearnWeb3".

- Application Stores your passwords details on chains in a encrypted manner.
- Application uses [LIT Protocol](https://litprotocol.com/) to Encrypt, Decrypt and Accesscontrol making it accessible to user's only.
- Application uses [Ceramic Network](https://ceramic.network/) to store User's Encrypted Data in a Tile Document. It helps us to add one more layer of security
- Dynamically generated NFT's are used as access token for Application usage.
- Currently Supporting Goerli and Polygon Mumbai. However more network supports can be configured.

## Demo URL : [https://w3passwordmanager.vercel.app](https://w3passwordmanager.vercel.app)

## Project Flows and Supporting Screenshots

- Home Page
  ![image](https://user-images.githubusercontent.com/56193257/204447597-e682c8c2-9c6a-4a87-af44-30ebd8100c50.png)

- Sign-Up Page

  1. Mint a Non-Transferable NFT to get access to Password Vault Application
     ![image](https://user-images.githubusercontent.com/56193257/204448727-21e0337e-5458-42a7-8cec-c1173087a8d7.png)
  2. NFT details available on Opensea
     ![image](https://user-images.githubusercontent.com/56193257/204449234-85353333-9245-4fb2-a706-0408f89692b0.png)

- Logged-In Page

  1. Once Logged-in, User will see below page which has 1 default Vault.
     ![image](https://user-images.githubusercontent.com/56193257/204449718-12d62a9b-d0ef-4fc3-b335-b00e563a8980.png)

  2. Logged-in User can create multiple Vaults,for example Social Media Vault, Bank Accounts Vault, Credit Cards Vault to segregate password as per will.
     ![image](https://user-images.githubusercontent.com/56193257/204450930-0ac842b1-8edd-4586-b63a-2f0bc9454f25.png)

  3. ENS Name and ENS Avatar of user is also displayed, if exists.
     ![image](https://user-images.githubusercontent.com/56193257/204451250-2f20cde4-afa0-44fa-b830-e846147ccddc.png)

  4. Auto Generation of Password
     ![image](https://user-images.githubusercontent.com/56193257/204451778-66618ccf-0f4c-49bf-b086-67d84998e529.png)

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

3. While you are in `./smart-contracts` directory, run `npx hardhat deploy --tags all --network goerli` to deploy updated contract on Goerli Network.
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

### Supported Networks

Currently Application supports two networks : `Goerli and Polygon Mumbai`

## Tech-Stacks Used

1.  [Hardhat](https://hardhat.org/) for Smart Contract Development
2.  [NextJS](https://nextjs.org/) framework for Frontend Development
3.  [Pinata](https://www.pinata.cloud/) for IPFS support
4.  [LIT Protocol](https://litprotocol.com/) to provide AccessControl, Encryption and Decryption
5.  [Ceramic Network](https://ceramic.network/) to Store Data

## Other Features

- Auto Password Generation
- Multiple Vault Support
- Save data in 1-GO to support Minimal Blockchain Interaction and Maximum Chain Utilization.
