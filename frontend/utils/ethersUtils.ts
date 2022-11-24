import { ethers } from "ethers";
import { config } from "../config/config";
import { PasswordManager } from "../constants/types/PasswordManager";

export const getTokenId = async (contract: PasswordManager, address: string): Promise<number> => {
  try {
    const tokenId = await contract.ownerToToken(address);
    return tokenId.toNumber();
  } catch (error) {
    console.error("Ether-utils:getTokenId", error);
    return 0;
  }
};

export const getTokenCounter = async (contract: PasswordManager): Promise<number> => {
  try {
    const tokenCounter = await contract.tokenIdCounter();
    return tokenCounter.toNumber();
  } catch (error) {
    console.error("Ether-utils:getTokenCounter", error);
    return 0;
  }
};

export const mintNFTAccessToken = async (
  contract: PasswordManager,
  url: string
): Promise<boolean> => {
  try {
    const tx = await contract.safeSingleMint(url);
    await tx.wait(config.application.defaultBlockConfirmations);
    return true;
  } catch (error) {
    console.error("Ether-utils:mintNFTAccessToken", error);
    return false;
  }
};

// await contract.balanceOf(signer.address);
