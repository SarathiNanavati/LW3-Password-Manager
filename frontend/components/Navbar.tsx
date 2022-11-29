import { AppBar, Toolbar, IconButton, Typography, Stack } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import { useAccount, useNetwork } from "wagmi";
import { useEffect } from "react";
import { asyncLocalStorage } from "../utils/utils";

const Navbar = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { chain, chains } = useNetwork();

  useEffect(() => {
    const func = async () => {
      if (address && address.length > 0) {
        const localUserAddress = await asyncLocalStorage.getItem("connectedAddress");
        if (localUserAddress === "") {
          await asyncLocalStorage.setItem("connectedAddress", address);
        } else if (localUserAddress !== address) {
          await asyncLocalStorage.setItem("connectedAddress", address);
          Router.reload();
        }
      }
      if (chain && chain.network !== "") {
        const connectedChain = await asyncLocalStorage.getItem("connectedChain");
        if (connectedChain === "") {
          await asyncLocalStorage.setItem("connectedChain", chain.network);
        } else if (connectedChain !== chain.network) {
          await asyncLocalStorage.setItem("connectedChain", chain.network);
          Router.reload();
        }
      }
    };
    func();
  }, [address, chain]);

  const navigateToHome: React.MouseEventHandler = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <AppBar
      position='sticky'
      sx={{ paddingLeft: "100px", paddingRight: "100px" }}
      color='secondary'>
      <Toolbar>
        <Typography variant='h5' component='div' sx={{ flexGrow: 1 }} color='primary.main'>
          <IconButton size='large' color='inherit' onClick={navigateToHome}>
            <Image src='/assets/vault.png' height={50} width={50} alt='' />
          </IconButton>
          <b>Password Vault</b>
        </Typography>
        <Stack direction='row' spacing={10}>
          <ConnectButton
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
            accountStatus='full'
            chainStatus={{
              smallScreen: "name",
              largeScreen: "full",
            }}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
