import { chain, Chain } from "wagmi";

export enum APIKEYNAME {
  POLYGONMUMBAI_ALCHEMY_API_KEY = "POLYGONMUMBAI_ALCHEMY_API_KEY",
}

export const config: ConfigMapping = {
  application: {
    name: "LW3 Lit Password Manager",
    supportedChains: [chain.polygonMumbai],
  },
  client: {
    POLYGONMUMBAI_ALCHEMY_API_KEY:
      process.env.NEXT_PUBLIC_POLYGONMUMBAI_ALCHEMY_API_KEY || "INCORRECT API KEY",
  },
};

export type ConfigMapping = {
  client: ClientConfig;
  application: ApplicationConfig;
};

export type ApplicationConfig = {
  name: string;
  supportedChains: Chain[];
};

export type ClientConfig = {
  [apiKey: string]: string;
};
