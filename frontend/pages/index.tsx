import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Welcome from "../components/welcomePage/Welcome";
import SignUp from "../components/signUpPage/SignUp";
import SignedIn from "../components/signedInPage/SignedIn";
import { useAccount, useContract, useSigner } from "wagmi";
import { config, NetworkConfig } from "../config/config";
import abi from "../constants/abis/PasswordManager.json";
import { getTokenCounter, GetTokenId, getTokenId, setContract } from "../utils/ethersUtils";
import { PasswordManager } from "../constants/types/PasswordManager";
import {
  updateAddress,
  updateContract,
  updateSigner,
  updateTokenCounter,
  updateTokenId,
} from "../features/userSlice";
import { useAppDispatch } from "../store/store";
import { Signer } from "ethers";

console.log("config", config);

const { application, networks } = config;
const chainId = application.supportedChains[0].id;
const contractName = application.passwordManagerContractName;

export enum ProcessStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export enum UserStatus {
  WELCOME = "Welcome",
  CONNECTED = "Connected",
  SIGNED_IN = "SignedIn",
}

const Home: NextPage = () => {
  const [tokenId, setTokenId] = useState(0);
  const [pageState, setPageState] = useState<UserStatus>(UserStatus.WELCOME);
  const dispatch = useAppDispatch();
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const contract = useContract({
    address: networks[contractName][chainId],
    abi,
    signerOrProvider: signer,
  }) as PasswordManager;

  useEffect(() => {
    const func = async () => {
      dispatch(updateContract({ contract }));
      dispatch(updateSigner({ signer: (signer as Signer)! }));
      dispatch(updateAddress({ address: address! }));
      const tokenId = await getTokenId(contract as PasswordManager, address!);
      dispatch(updateTokenId({ tokenId }));
      const tokenCounter = await getTokenCounter(contract as PasswordManager);
      dispatch(updateTokenCounter({ counter: tokenCounter }));
      setTokenId(tokenId);
    };
    if (signer) {
      func();
    }
  }, [signer, address]);

  useEffect(() => {
    if (isConnected && tokenId !== 0) setPageState(UserStatus.SIGNED_IN);
    else if (isConnected && tokenId === 0) setPageState(UserStatus.CONNECTED);
    else setPageState(UserStatus.WELCOME);
  }, [tokenId, isConnected]);

  return (
    <>
      {pageState === UserStatus.WELCOME && <Welcome />}
      {pageState === UserStatus.CONNECTED && <SignUp />}
      {pageState === UserStatus.SIGNED_IN && <SignedIn />}
    </>
  );
};

export default Home;
