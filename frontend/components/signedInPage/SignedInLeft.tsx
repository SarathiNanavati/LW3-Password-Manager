import { Box, Typography, Avatar, IconButton, Stack, Button } from "@mui/material";
import { List, ListItemButton, Collapse, ListItem } from "@mui/material";
import {
  ContentCopy as ContentCopyIcon,
  ExpandLess,
  ExpandMore,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { getMaskedUserAddress, getUserState } from "../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { sleepInMilliSeconds } from "../../utils/utils";
import {
  deleteVaultByIndex,
  getVaultsState,
  updateVaultSelectedIndex,
} from "../../features/vaultSlice";
import CustomModal from "../layout/CustomModal";
import CreateVaultForm from "../forms/CreateVaultForm";
import CancelConfirmForm from "../forms/CancelConfirmForm";

export type SignedInLeftProps = {};

const SignedInLeft = (props: SignedInLeftProps) => {
  const { address, ensName, ensAvatarUrl, chain } = useAppSelector(getUserState);
  const maskedAddress = useAppSelector(getMaskedUserAddress);
  const dispatch = useAppDispatch();
  const [disableCopyButton, setDisableCopyButton] = useState(false);
  const [openVaultDropDown, setOpenVaultDropDown] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVaultIndex, setSelectedVaultIndex] = useState(0);
  const [modalTitle, setModalTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [isAlertModal, setIsAlertModal] = useState(false);
  const vaultState = useAppSelector(getVaultsState);
  const vaultsName = vaultState.vaults.map((vault) => vault.vaultName);

  const handleVaultItemClicked = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selectedIndex: number
  ) => {
    updateVaultSelectedIndexFn(selectedIndex);
  };

  const updateVaultSelectedIndexFn = (selectedIndex: number) => {
    setSelectedVaultIndex(selectedIndex);
    dispatch(updateVaultSelectedIndex({ index: selectedIndex }));
  };

  const handleDeleteVault = () => {
    updateVaultSelectedIndexFn(selectedVaultIndex === 0 ? 0 : selectedVaultIndex - 1);
    dispatch(deleteVaultByIndex({ index: selectedVaultIndex }));
    setOpenModal(false);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = (mode: string, clickedIndex: number = 0) => {
    setIsAlertModal(false);
    if (mode === "delete") {
      updateVaultSelectedIndexFn(clickedIndex);
      setIsAlertModal(true);
      setOpenModal(true);
    } else if (mode === "edit") {
      updateVaultSelectedIndexFn(clickedIndex);
      setEditMode(true);
      setItemIndex(clickedIndex);

      setModalTitle("Update Vault Name");
      setOpenModal(true);
    } else {
      setEditMode(false);
      setItemIndex(0);
      setModalTitle("Create New Vault");
      setOpenModal(true);
    }
  };

  const handleCopyButton = async () => {
    setDisableCopyButton(true);
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(address!.toString());
    } else {
      document.execCommand("copy", true, address);
    }
    await sleepInMilliSeconds(2000);
    setDisableCopyButton(false);
  };

  return (
    <>
      <Stack
        direction='column'
        sx={{ flex: 1, display: "flex", alignItems: "stretch", margin: "5px" }}>
        <Box
          bgcolor='grey.500'
          sx={{ display: "flex", flexDirection: "row", borderRadius: "10px", height: "80px" }}>
          <Box sx={{ flex: 1 }}>
            <Avatar
              src={ensAvatarUrl ? ensAvatarUrl : "/icons/128/anonymity.png"}
              sx={{
                bgcolor: "primary.light",
                textAlign: "center",
                width: 64,
                height: 64,
                margin: "10px",
              }}
            />
          </Box>
          <Box
            sx={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}>
            <Typography gutterBottom variant='h4' component='div' sx={{ fontSize: "140%" }}>
              {ensName ? ensName : maskedAddress}
              {!disableCopyButton ? (
                <IconButton onClick={() => handleCopyButton()}>
                  <ContentCopyIcon fontSize='medium' />
                </IconButton>
              ) : (
                <></>
              )}
            </Typography>
            <Typography
              gutterBottom
              variant='h4'
              component='div'
              sx={{ paddingX: "40px", fontSize: "140%" }}>
              {chain?.network.toUpperCase()}
            </Typography>
          </Box>
        </Box>

        <Box
          bgcolor='grey.400'
          sx={{
            marginTop: "5px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
          }}>
          <List
            sx={{
              padding: "10px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyItems: "flex-start",
            }}
            component='nav'
            aria-labelledby='nested-list-subheader'>
            <ListItemButton
              onClick={() => setOpenVaultDropDown(!openVaultDropDown)}
              sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography gutterBottom variant='h4' component='div' sx={{ fontSize: "140%" }}>
                Your Vaults
              </Typography>
              {openVaultDropDown ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openVaultDropDown} timeout='auto' unmountOnExit sx={{ display: "flex" }}>
              <List
                component='div'
                disablePadding
                sx={{ display: "flex", flexDirection: "column" }}>
                {vaultsName &&
                  vaultsName.length !== 0 &&
                  vaultsName.map((vaultName, index) => {
                    return (
                      <ListItem
                        selected={selectedVaultIndex === index}
                        key={index}
                        sx={{
                          pl: 4,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          borderRadius: "10px",
                        }}>
                        <Button
                          onClick={(e) => handleVaultItemClicked(e, index)}
                          sx={{
                            flex: 1,
                            textAlign: "left",
                            color: "#000",
                            ":hover": "1",
                          }}>
                          <Typography
                            gutterBottom
                            variant='h5'
                            component='div'
                            sx={{ flex: 1, fontSize: "140%" }}>
                            {vaultName}
                          </Typography>
                        </Button>
                        <IconButton onClick={(e) => handleModalOpen("edit", index)}>
                          <EditIcon />
                        </IconButton>
                        {vaultState.vaults.length !== 1 && (
                          <IconButton onClick={(e) => handleModalOpen("delete", index)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </ListItem>
                    );
                  })}
              </List>
            </Collapse>
            <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant='contained' onClick={(e) => handleModalOpen("create")}>
                <Typography gutterBottom variant='h4' component='div' sx={{ fontSize: "140%" }}>
                  Create New Vault
                </Typography>
              </Button>
            </ListItem>
          </List>
        </Box>
      </Stack>
      <CustomModal openModal={openModal} title={modalTitle} handleModalClose={handleModalClose}>
        {!isAlertModal && (
          <CreateVaultForm
            editMode={editMode}
            itemIndex={itemIndex}
            handleModalClose={handleModalClose}
          />
        )}
        {isAlertModal && (
          <CancelConfirmForm
            message='Once Confirmed, Entire Vault Data Will be deleted from memory. After Saving, changes will be permanent. Are you sure?'
            handleClose={handleModalClose}
            handleConfirm={handleDeleteVault}
          />
        )}
      </CustomModal>
    </>
  );
};

export default SignedInLeft;
