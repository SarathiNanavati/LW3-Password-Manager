import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import { theme } from "../../theme/theme";
import * as htmlToImage from "html-to-image";
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../store/store";
import { getUserState } from "../../features/userSlice";
import { pinFileToIPFS, pinMetaDataToIPFS } from "../../utils/pinataUtils";
import { createMetaDataJson, dataURLtoFile } from "../../utils/utils";
import { mintNFTAccessToken } from "../../utils/ethersUtils";
import Router from "next/router";
import Snack from "../layout/Snack";

//...

type SignUpProps = {};

const SignUp = (props: SignUpProps) => {
  const cardHeight = 700;
  const doubleCardHeight = cardHeight * 2;
  const buttonLabel = "Sign-Up/Register";
  const nftImageBox = useRef(null);
  const [loading, setLoading] = useState(false);
  const { tokenCounter, contract } = useAppSelector(getUserState);
  const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(false);
  const userState = useAppSelector(getUserState);

  useEffect(() => {
    tokenCounter === 0 ? setSignUpButtonDisabled(true) : setSignUpButtonDisabled(false);
  }, [tokenCounter]);

  // const setSnackBarToInfo = () => {
  //   // dispatch(updateSnackBarMessage({ message: "Please wait. We will mint NFT for you" }));
  //   // dispatch(updateSnackBarOpen({ open: true }));
  //   // dispatch(updateSnackBarSeverity({ severity: "info" }));
  // };

  // const setSnackBarToError = () => {
  //   // dispatch(updateSnackBarMessage({ message: "Minting NFT Failed" }));
  //   // dispatch(updateSnackBarOpen({ open: true }));
  //   // dispatch(updateSnackBarSeverity({ severity: "error" }));
  //   Snack.error("Minting NFT Failed");
  // };

  // const setSnackBarToSuccess = () => {
  //   // dispatch(
  //   //   updateSnackBarMessage({
  //   //     message: `Congrat! You now have access to Password Vault.. Page will auto refresh in 5 seconds`,
  //   //   })
  //   // );
  //   // dispatch(updateSnackBarOpen({ open: true }));
  //   // dispatch(updateSnackBarSeverity({ severity: "success" }));
  //   Snack.success(
  //     "Congrat! You now have access to Password Vault.. Page will auto refresh in 5 seconds"
  //   );
  // };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const pngFilename = `PasswordManage#${tokenCounter}.png`;
    const nftFilename = `PasswordManage#${tokenCounter}.dat`;

    try {
      setLoading(true);
      Snack.warning("Uploading Your NFT To IPFS");

      const dataUrl = await htmlToImage.toPng(nftImageBox.current!);
      var file = dataURLtoFile(dataUrl, pngFilename);
      let { status, ipfsHashUrl } = await pinFileToIPFS(file, pngFilename);

      if (status) {
        const nftMetaData = createMetaDataJson(ipfsHashUrl);
        const pinMetaDataToIPFSResponse = await pinMetaDataToIPFS(nftMetaData, nftFilename);
        if (pinMetaDataToIPFSResponse.status) {
          Snack.warning("Registering Your NFT on BlockChain");

          const mintNFTAccessTokenStatus = await mintNFTAccessToken(
            contract!,
            pinMetaDataToIPFSResponse.ipfsHashUrl
          );
          if (mintNFTAccessTokenStatus) {
            Snack.success(
              "Congratulations! You now have access to Password Vault.. Page will auto refresh in 5 seconds"
            );
            setSignUpButtonDisabled(true);
            setInterval(() => {
              Router.reload();
            }, 5000);
          } else {
            Snack.error("Minting NFT Failed");
          }
        } else {
          Snack.error("Could Not Upload NFT to IPFS");
        }
      } else {
        Snack.error("Could Not Upload NFT to IPFS");
      }
    } catch (error) {
      console.error(error);
      Snack.error("Minting Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card sx={{ marginY: 5, bgcolor: "grey.200", color: "common.black" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            [theme.breakpoints.down("md")]: {
              height: `${doubleCardHeight}px`,
            },
            [theme.breakpoints.up("md")]: {
              height: `${cardHeight}px`,
            },
          }}>
          <Grid container my={5} sx={{ flex: 1, display: "flex", justifyContent: "space-evenly" }}>
            <Grid
              item
              sx={{
                padding: "10px",
                width: "430px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                [theme.breakpoints.down("md")]: {
                  height: `500px`,
                },
              }}>
              <Avatar
                src={"/icons/128/bitcoin.png"}
                sx={{
                  bgcolor: "primary.light",
                  textAlign: "center",
                  width: 128,
                  height: 128,
                  marginY: "auto",
                }}
              />
              <Box sx={{ flex: 1, margin: "40px" }}>
                <Typography gutterBottom variant='h4' component='div'>
                  Sign-Up/Register With us to get access to Password Vault App and Start Adding
                  Secerts
                </Typography>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    variant='contained'
                    size='large'
                    onClick={(e) => handleSignUp(e)}
                    disabled={signUpButtonDisabled}>
                    {buttonLabel}
                  </Button>
                )}
              </Box>
            </Grid>

            <Grid
              item
              sx={{
                padding: "10px",
                width: "430px",
                [theme.breakpoints.down("md")]: {
                  height: `500px`,
                  width: "430px",
                },
              }}>
              <Box
                ref={nftImageBox}
                sx={{
                  height: "100%",
                  width: "100%",
                  position: "relative",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "30px",
                  },
                  [theme.breakpoints.up("md")]: {
                    fontSize: "50px",
                  },
                }}>
                <Image
                  src='/assets/nft-template.png'
                  alt='Access NFT'
                  layout='fill'
                  objectFit='contain'
                />
                <Typography
                  gutterBottom
                  variant='h4'
                  component='div'
                  sx={{
                    fontSize: "50%",
                    textAlign: "center",
                    color: "#000",
                    position: "absolute",
                    top: "80px",
                    left: "30px",
                    height: "fit-content",
                    margin: "auto",
                    [theme.breakpoints.down("md")]: {
                      fontSize: "80%",
                      top: "40px",
                      left: "70px",
                    },
                  }}>
                  LearnWeb3
                </Typography>
                <Typography
                  gutterBottom
                  variant='h4'
                  component='p'
                  sx={{
                    fontSize: "50%",
                    textAlign: "center",
                    color: "#000",
                    position: "absolute",
                    top: "70px",
                    right: "30px",
                    height: "fit-content",
                    margin: "auto",
                    width: "150px",
                    [theme.breakpoints.down("md")]: {
                      fontSize: "60%",
                      top: "35px",
                      right: "30px",
                      width: "150px",
                    },
                  }}>
                  {userState.chain?.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant='h4'
                  component='div'
                  sx={{
                    fontSize: "100%",
                    textAlign: "center",
                    color: "#000",
                    position: "absolute",
                    textShadow: "0 0 25px grey",
                    top: "-20%",
                    right: 0,
                    left: 0,
                    bottom: 0,
                    height: "fit-content",
                    margin: "auto",
                    [theme.breakpoints.down("md")]: {
                      top: "-15%",
                      width: "170px",
                    },
                  }}>
                  Password Manager <br />
                  Access NFT
                </Typography>

                <Typography
                  gutterBottom
                  variant='h4'
                  component='div'
                  sx={{
                    fontSize: "60%",
                    textAlign: "center",
                    color: "#000",
                    position: "absolute",
                    top: "60%",
                    right: 0,
                    left: 0,
                    bottom: 0,
                    margin: "40px",
                    height: "fit-content",
                    border: "2px solid #000",
                    boxShadow: "5px 5px 0 #111",
                    [theme.breakpoints.down("md")]: {
                      fontSize: "80%",
                      top: "50%",
                      margin: "80px",
                    },
                  }}>
                  Token Id # {tokenCounter}
                </Typography>
                <Typography
                  gutterBottom
                  variant='h3'
                  component='div'
                  sx={{
                    fontSize: "40%",
                    textAlign: "center",
                    color: "#000",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: "-65%",
                    height: "fit-content",
                    margin: "auto",
                    [theme.breakpoints.down("md")]: {
                      fontSize: "60%",
                    },
                  }}>
                  {DateTime.now().toFormat("hh:mm a - dd MMM yyyy")}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default SignUp;
