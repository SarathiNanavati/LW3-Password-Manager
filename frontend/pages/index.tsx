import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Welcome from "../components/welcomePage/Welcome";
import SignUp from "../components/signUpPage/SignUp";
import SignedIn from "../components/signedInPage/SignedIn";
import { useAccount, useContract, useEnsAvatar, useEnsName, useSigner, useNetwork } from "wagmi";
import { config } from "../config/config";
import abi from "../constants/abis/PasswordManager.json";
import { getTokenCounter, getTokenId } from "../utils/ethersUtils";
import { PasswordManager } from "../constants/types/contracts/PasswordManager";
import {
  updateUserAddress,
  updateContract,
  updateSigner,
  updateTokenCounter,
  updateUserTokenId,
  updateUserEnsName,
  updateUserEnsAvatarUrl,
  resetUser,
  updateChain,
} from "../features/userSlice";
import { useAppDispatch } from "../store/store";
import { Signer } from "ethers";

const { application, networks } = config;
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
  const { chain, chains } = useNetwork();
  const [pageState, setPageState] = useState<UserStatus>(UserStatus.WELCOME);
  const dispatch = useAppDispatch();
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ address });
  const contractAddress = chain && networks[contractName][chain.id];
  const contract = useContract({
    address: contractAddress,
    abi,
    signerOrProvider: signer,
  }) as PasswordManager;

  useEffect(() => {
    const func = async () => {
      dispatch(resetUser());
      contract && dispatch(updateContract({ contract }));
      signer && dispatch(updateSigner({ signer: (signer as Signer)! }));
      address && dispatch(updateUserAddress({ address: address! }));
      chain && dispatch(updateChain({ chain: chain }));
      const tokenId = await getTokenId(contract as PasswordManager, address!);
      dispatch(updateUserTokenId({ tokenId }));
      const tokenCounter = await getTokenCounter(contract as PasswordManager);
      dispatch(updateTokenCounter({ counter: tokenCounter }));
      setTokenId(tokenId);

      if (ensName) {
        dispatch(updateUserEnsName({ ensName }));
      }
      if (ensAvatar) {
        dispatch(updateUserEnsAvatarUrl({ ensAvatarUrl: ensAvatar! }));
      }
    };
    if (signer) {
      func();
    }
  }, [signer, address, ensName, ensAvatar, chain, contract]);

  useEffect(() => {
    if (!chain) setPageState(UserStatus.WELCOME);
    else if (isConnected && tokenId !== 0) setPageState(UserStatus.SIGNED_IN);
    else if (isConnected && tokenId === 0) setPageState(UserStatus.CONNECTED);
    else setPageState(UserStatus.WELCOME);
  }, [tokenId, isConnected, address]);

  return (
    <>
      {pageState === UserStatus.WELCOME && <Welcome />}
      {pageState === UserStatus.CONNECTED && <SignUp />}
      {pageState === UserStatus.SIGNED_IN && <SignedIn />}
    </>
  );
};

export default Home;
