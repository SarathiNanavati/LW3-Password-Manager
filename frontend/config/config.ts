import { chain, Chain } from "wagmi";
import data from "../constants/networkMapping.json";
const dataJson = JSON.parse(JSON.stringify(data));

export enum APIKEYNAME {
  POLYGONMUMBAI_ALCHEMY_API_KEY = "POLYGONMUMBAI_ALCHEMY_API_KEY",
}

export const config: ConfigMapping = {
  application: {
    name: "LW3 Lit Password Manager",
    supportedChains: [chain.polygonMumbai],
    passwordManagerContractName: "PasswordManager",
    defaultBlockConfirmations: 2,
    snakeBarAutoHideDuration: 5000,
  },
  client: {
    POLYGONMUMBAI_ALCHEMY_API_KEY:
      process.env.NEXT_PUBLIC_POLYGONMUMBAI_ALCHEMY_API_KEY || "INCORRECT API KEY",
    PINATA_API_KEY: process.env.NEXT_PUBLIC_PINATA_API_KEY || "INCORRECT API KEY",
    PINATA_API_SECRET: process.env.NEXT_PUBLIC_PINATA_API_SECRET || "INCORRECT API SERCET",
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
