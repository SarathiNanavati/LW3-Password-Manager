import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Welcome from "../components/Welcome";
import SignUp from "../components/SignUp";
import SignedIn from "../components/SignedIn";
import { useAccount } from "wagmi";

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
  const [pageState, setPageState] = useState<UserStatus>(UserStatus.WELCOME);
  // possible Value : Welcome-notConnected, SignIn-connected, Store-connected and Siginned In
  const { address, isConnecting, isConnected, isDisconnected } = useAccount();
  console.log(address, isConnecting, isConnected, isDisconnected);

  useEffect(() => {
    if (isDisconnected) setPageState(UserStatus.WELCOME);
  }, [isConnecting, isConnected, isDisconnected]);

  return (
    <>
      {pageState === UserStatus.WELCOME && <Welcome />}
      {pageState === UserStatus.CONNECTED && <SignUp />}
      {pageState === UserStatus.SIGNED_IN && <SignedIn />}
    </>
  );
};

export default Home;
