type NetworkMapping = {
  [chainId: number]: {
    blockConfirmations: number;
  };
};

const networkConfig: NetworkMapping = {
  80001: {
    blockConfirmations: 4,
  },
  5: {
    blockConfirmations: 4,
  },
  31337: {
    blockConfirmations: 1,
  },
  1337: {
    blockConfirmations: 1,
  },
};
const developmentChains: string[] = ["hardhat", "localhost"];

export { networkConfig, developmentChains };
