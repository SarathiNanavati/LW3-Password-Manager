import { Stack, Box, Typography, Button, List, ListItem, IconButton } from "@mui/material";
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import {
  CreditCardType,
  DocumentType,
  getSelectedRecordIndex,
  getSelectedVaultIndex,
  getSelectedVaultRecord,
  RecordType,
  updateRecordAttribute,
  WebsiteType,
} from "../../features/vaultSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useState } from "react";
import CustomModal from "../layout/CustomModal";
import SingleUpdateInputFieldForm from "../forms/SingleUpdateInputFieldForm";
import { getUserState } from "../../features/userSlice";

const SignedInRight = () => {
  const userState = useAppSelector(getUserState);
  const dispatch = useAppDispatch();
  const recordState = useAppSelector(getSelectedVaultRecord);
  const [visible, setVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataKey, setDataKey] = useState("");
  const [dataKeyDisplay, setDataKeyDisplay] = useState("");
  const [dataValue, setDataValue] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const recordAttributes =
    recordState?.recordType === RecordType.WEBSITE
      ? (recordState.recordAttributes as WebsiteType)
      : recordState?.recordType === RecordType.CREDIT_CARD
      ? (recordState.recordAttributes as CreditCardType)
      : recordState?.recordType === RecordType.DOCUMENT
      ? (recordState.recordAttributes as DocumentType)
      : null;

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleUpdateRecordAttributes = (keyName: string, value: string) => {
    dispatch(updateRecordAttribute({ key: keyName, value }));
  };

  const handleModalOpen = (keyName: string, keyDisplayName: string, value: string) => {
    setDataKey(keyName);
    setDataKeyDisplay(keyDisplayName);
    setDataValue(value);
    setModalTitle(`Update ${keyDisplayName}`);
    setOpenModal(true);
  };

  return (
    <>
      <Stack
        direction='column'
        sx={{ flex: 1, display: "flex", alignItems: "stretch", margin: "5px" }}>
        <Box
          bgcolor='grey.400'
          sx={{
            flex: 3,
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              borderRadius: "10px",
              padding: "20px",
              height: "80px",
              alignItems: "center",
            }}>
            <Typography
              gutterBottom
              variant='h4'
              component='div'
              sx={{
                flex: 1,
                display: "flex",
                fontSize: "140%",
              }}>
              Password's Details
            </Typography>
            {/* <Button variant='text'>
              <Typography gutterBottom variant='h4' component='div' sx={{ fontSize: "140%" }}>
                Delete Record
              </Typography>
            </Button> */}
          </Box>
          <List
            sx={{
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyItems: "flex-start",
            }}
            component='nav'
            aria-labelledby='nested-list-subheader'>
            {recordState?.recordType === RecordType.WEBSITE && (
              <>
                <ListItem
                  key='domainName'
                  sx={{
                    pl: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    borderRadius: "10px",
                  }}>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component='div'
                    color='primary'
                    sx={{ flex: 1, fontSize: "140%" }}>
                    Domain Name Or Webiste URL:
                  </Typography>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component='div'
                    sx={{ flex: 1, fontSize: "140%", marginLeft: "10px" }}>
                    {recordAttributes.domaninNameOrUrl}
                  </Typography>
                  <IconButton
                    onClick={(e) =>
                      handleModalOpen(
                        "domaninNameOrUrl",
                        "Domain Name Or URL",
                        recordAttributes.domaninNameOrUrl
                      )
                    }>
                    <EditIcon />
                  </IconButton>
                </ListItem>
                <ListItem
                  key='userName'
                  sx={{
                    pl: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    borderRadius: "10px",
                  }}>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component='div'
                    color='primary'
                    sx={{ flex: 1, fontSize: "140%" }}>
                    Email Or User Name:
                  </Typography>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component='div'
                    sx={{ flex: 1, fontSize: "140%", marginLeft: "10px" }}>
                    {recordAttributes.userNameOrEmail}
                  </Typography>
                  <IconButton
                    onClick={(e) =>
                      handleModalOpen(
                        "userNameOrEmail",
                        "Email Or User Name",
                        recordAttributes.userNameOrEmail
                      )
                    }>
                    <EditIcon />
                  </IconButton>
                </ListItem>
                <ListItem
                  key='password'
                  sx={{
                    pl: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    borderRadius: "10px",
                  }}>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component='div'
                    color='primary'
                    sx={{ flex: 1, fontSize: "140%" }}>
                    Password:
                  </Typography>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component='div'
                    sx={{ flex: 1, fontSize: "140%", marginLeft: "10px" }}>
                    {visible ? recordAttributes.passwordOrSecret : "*******"}
                  </Typography>
                  <Box>
                    <IconButton onClick={() => setVisible(!visible)}>
                      {visible && <VisibilityIcon />}
                      {!visible && <VisibilityOffIcon />}
                    </IconButton>
                    <IconButton
                      onClick={(e) =>
                        handleModalOpen(
                          "passwordOrSecret",
                          "Password",
                          recordAttributes.passwordOrSecret
                        )
                      }>
                      <EditIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              </>
            )}
          </List>
        </Box>
        {userState.isVaultUpdated && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              borderRadius: "10px",
              marginTop: "10px",
              alignItems: "center",
            }}>
            <Button
              variant='contained'
              color='primary'
              sx={{
                width: "100%",
                height: "100%",
              }}>
              <Typography gutterBottom variant='h4' component='div' sx={{ fontSize: "140%" }}>
                Save/Update All Changes at Once
              </Typography>
            </Button>
          </Box>
        )}
      </Stack>
      <CustomModal openModal={openModal} title={modalTitle} handleModalClose={handleModalClose}>
        <SingleUpdateInputFieldForm
          dataKey={dataKey}
          dataKeyDisplay={dataKeyDisplay}
          dataValue={dataValue}
          handleUpdate={handleUpdateRecordAttributes}
          handleClose={handleModalClose}
        />
      </CustomModal>
    </>
  );
};

export default SignedInRight;
