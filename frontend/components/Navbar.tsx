import { AppBar, Toolbar, IconButton, Typography, Stack } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();

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
            accountStatus='address'
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
