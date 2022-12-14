import { Grid, Card, CardContent, Typography } from "@mui/material";
import SignedInRight from "./SignedInRight";
import SignedInLeft from "./SignedInLeft";
import SignedInCenter from "./SignedInCenter";
import { decryptString, getAccessControlConditions } from "../../utils/litUtils";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getUserState, updateUserOldVaultsState } from "../../features/userSlice";
import { useState, useEffect } from "react";
import { authenticateCeramicClient, loadDocument } from "../../utils/ceramicUtils";
import { getUserStreamId } from "../../utils/ethersUtils";
import { getVaultsState, updateVaultsState } from "../../features/vaultSlice";
import TypedMessage from "../ui/TypedMessage";
import { config } from "../../config/config";
import { addErrorToast, addInfoToast, addSuccessToast } from "../../features/toastSlice";
import { theme } from "../../theme/theme";

type SignedInProps = {};

const SignedIn = (props: SignedInProps) => {
  const userState = useAppSelector(getUserState);
  const vaultsState = useAppSelector(getVaultsState);
  const contractAddress =
    userState.chain &&
    config.networks[config.application.passwordManagerContractName][userState.chain.id];

  const accessControl = getAccessControlConditions(
    userState.tokenId,
    userState.address!.toString(),
    userState.chain!.network,
    contractAddress!
  );
  const [pageLoaded, setPageLoaded] = useState(false);
  const dispatch = useAppDispatch();

  // await decryptString(encryptedString, encryptedSymmetricKey, accessControl);

  useEffect(() => {
    const callFn = async () => {
      try {
        const streamId = await getUserStreamId(userState.contract!);
        if (streamId === "") {
          dispatch(updateUserOldVaultsState({ vaultsState }));
        } else {
          dispatch(addInfoToast({ title: "Info:", description: "Authenticating Connected User" }));
          await authenticateCeramicClient(userState.address!.toString());
          dispatch(addInfoToast({ title: "Info:", description: "Fetching Data from Chain" }));

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
        dispatch(addSuccessToast({ title: "Success:", description: "Loaded User Data" }));

        setPageLoaded(true);
      } catch (error) {
        console.error(error);
        dispatch(
          addErrorToast({
            title: "Error:",
            description: "Failed to Load Data, Please connect with Administrator",
          })
        );
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
            [theme.breakpoints.down("md")]: {
              height: "auto",
            },
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
              <TypedMessage titles={["Please be patient. We are loading your Vault Information"]} />
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default SignedIn;
