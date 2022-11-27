import { Grid, Card, CardContent, Typography } from "@mui/material";
import SignedInRight from "./SignedInRight";
import SignedInLeft from "./SignedInLeft";
import SignedInCenter from "./SignedInCenter";
import { decryptString, getAccessControlConditions } from "../../utils/litUtils";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getUserState, updateUserOldVaultsState } from "../../features/userSlice";
import { useState, useEffect } from "react";
import { authenticateCeramicClient, loadDocument } from "../../utils/ceramicUtils";
import { getStreamId } from "../../utils/ethersUtils";
import { getVaultsState, updateVaultsState } from "../../features/vaultSlice";
import Snack from "../layout/Snack";

type SignedInProps = {};

const SignedIn = (props: SignedInProps) => {
  const userState = useAppSelector(getUserState);
  const vaultsState = useAppSelector(getVaultsState);
  const accessControl = getAccessControlConditions(userState.tokenId, userState.address);
  const [pageLoaded, setPageLoaded] = useState(false);
  const dispatch = useAppDispatch();

  // await decryptString(encryptedString, encryptedSymmetricKey, accessControl);

  useEffect(() => {
    const callFn = async () => {
      try {
        const streamId = await getStreamId(userState.contract);
        if (streamId === "") {
          dispatch(updateUserOldVaultsState({ vaultsState }));
        } else {
          await authenticateCeramicClient(userState.address!.toString());
          const doc = await loadDocument(streamId);
          const { status, decryptedString } = await decryptString(
            doc.encryptedString,
            doc.encryptedSymmetricKey,
            doc.accessControlConditions,
            doc.chain
          );
          if (!status) throw new Error("Decryption Failed");
          const loadedVaultsState = JSON.parse(decryptedString);
          dispatch(updateUserOldVaultsState({ vaultsState: loadedVaultsState }));
          dispatch(updateVaultsState({ vaultsState: loadedVaultsState }));
        }

        setPageLoaded(true);
      } catch (error) {
        console.error(error);
        Snack.error("Failed to Load Data, Please connect with Administrator");
      }
    };

    callFn();
  }, [userState.address]);

  return (
    <>
      <Card sx={{ marginY: 5, bgcolor: "grey.200", color: "common.black" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "600px",
          }}>
          {pageLoaded ? (
            <Grid container sx={{ flex: 1, display: "flex", justifyContent: "space-evenly" }}>
              <Grid item sx={{ flex: 1, display: "flex" }}>
                <SignedInLeft />
              </Grid>
              <Grid item sx={{ flex: 1, display: "flex" }}>
                <SignedInCenter />
              </Grid>
              <Grid item sx={{ flex: 1, display: "flex" }}>
                <SignedInRight />
              </Grid>
            </Grid>
          ) : (
            <Typography
              gutterBottom
              variant='h4'
              component='div'
              sx={{ fontSize: "140%", textAlign: "center" }}>
              Please be patient. We are loading your Vault Information
            </Typography>
          )}{" "}
        </CardContent>
      </Card>
    </>
  );
};

export default SignedIn;
