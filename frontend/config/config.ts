import { chain, Chain } from "wagmi";
import data from "../constants/networkMapping.json";
const dataJson = JSON.parse(JSON.stringify(data));

export enum APIKEYNAME {
  POLYGONMUMBAI_ALCHEMY_API_KEY = "POLYGONMUMBAI_ALCHEMY_API_KEY",
  PINATA_API_KEY = "PINATA_API_KEY",
  PINATA_API_SECRET = "PINATA_API_SECRET",
  CERAMIC_API_URL = "CERAMIC_API_URL",
}

export const config: ConfigMapping = {
  application: {
    name: "LW3 Lit Password Manager",
    supportedChains: [chain.goerli, chain.polygonMumbai],
    passwordManagerContractName: "PasswordManager",
    defaultBlockConfirmations: 2,
    snakeBarAutoHideDuration: 5000,
    litAccessControlConditions: [
      {
        contractAddress: "",
        standardContractType: "ERC721",
        chain: "",
        method: "balanceOf",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: "1",
        },
      },
      { operator: "and" },
      {
        contractAddress: "",
        standardContractType: "ERC721",
        chain: "",
        method: "ownerOf",
        parameters: [],
        returnValueTest: {
          comparator: "=",
          value: ":userAddress",
        },
      },
      { operator: "and" },
      {
        contractAddress: "",
        standardContractType: "",
        chain: "",
        method: "eth_getBalance",
        parameters: [":userAddress", "latest"],
        returnValueTest: {
          comparator: ">=",
          value: "0",
        },
      },
    ],
    notificationAutoHideTime: 5000,
  },
  client: {
    POLYGONMUMBAI_ALCHEMY_API_KEY:
      process.env.NEXT_PUBLIC_POLYGONMUMBAI_ALCHEMY_API_KEY || "INCORRECT API KEY",
    PINATA_API_KEY: process.env.NEXT_PUBLIC_PINATA_API_KEY || "INCORRECT API KEY",
    PINATA_API_SECRET: process.env.NEXT_PUBLIC_PINATA_API_SECRET || "INCORRECT API SERCET",
    CERAMIC_API_URL: process.env.NEXT_PUBLIC_CERAMIC_API_URL || "INCORRECT API URL",
  },
  networks: { ...dataJson },
};

export type ConfigMapping = {
  client: ClientConfig;
  application: ApplicationConfig;
  networks: NetworkConfig;
};

export type ApplicationConfig = {
  name: string;
  supportedChains: Chain[];
  passwordManagerContractName: string;
  defaultBlockConfirmations: number;
  snakeBarAutoHideDuration: number;
  litAccessControlConditions: any;
  notificationAutoHideTime: number;
};

export type ClientConfig = {
  [apiKey: string]: string;
};

export type NetworkConfig = {
  [contractName: string]: ContractDetailMapping;
};

export type ContractDetailMapping = {
  [chain: number]: string;
};
