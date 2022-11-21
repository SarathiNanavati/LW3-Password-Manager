import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-chai-matchers";
import { HardhatUserConfig } from "hardhat/types";
import * as dotenv from "dotenv";
dotenv.config();
import "solidity-coverage";
import "hardhat-deploy";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const MUMBAI_NODE_URL = process.env.MUMBAI_NODE_URL || "";
const GOERLI_NODE_URL = process.env.GOERLI_NODE_URL || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.9" }],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
      url: "http://127.0.0.1:8545",
    },
    mumbai: {
      chainId: 80001,
      url: MUMBAI_NODE_URL,
      accounts: [PRIVATE_KEY],
    },
    goerli: {
      chainId: 5,
      url: GOERLI_NODE_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  namedAccounts: {
    deployer: 0,
    nftTokenUser: 1,
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
  },

  mocha: {
    timeout: 100000,
  },
};

export default config;
