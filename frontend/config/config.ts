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
    supportedChains: [chain.goerli],
    passwordManagerContractName: "PasswordManager",
    defaultBlockConfirmations: 2,
    snakeBarAutoHideDuration: 5000,
    litAccessControlConditions: [
      {
        contractAddress: dataJson["PasswordManager"][chain.goerli.id],
        standardContractType: "ERC721",
        chain: chain.goerli.network,
        method: "balanceOf",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: "1",
        },
      },
      { operator: "and" },
      {
        contractAddress: dataJson["PasswordManager"][chain.goerli.id],
        standardContractType: "ERC721",
        chain: chain.goerli.network,
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
        chain: chain.goerli.network,
        method: "eth_getBalance",
        parameters: [":userAddress", "latest"],
        returnValueTest: {
          comparator: ">=",
          value: "0",
        },
      },
    ],
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
