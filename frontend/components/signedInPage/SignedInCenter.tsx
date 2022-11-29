import { Stack, Box, List, ListItem, Typography, Button, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import {
  deleteRecordByIndex,
  getSelectedVaultRecords,
  getVaultsState,
  updateRecordName,
  updateRecordSelectedIndex,
} from "../../features/vaultSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import CustomModal from "../layout/CustomModal";
import SingleUpdateInputFieldForm from "../forms/SingleUpdateInputFieldForm";
import CancelConfirmForm from "../forms/CancelConfirmForm";
import CreateVaultRecodForm from "../forms/CreateVaultRecodForm";

const SignedInCenter = () => {
  const dispatch = useAppDispatch();
  const vaultsState = useAppSelector(getVaultsState);
  const vaultRecordsState = useAppSelector(getSelectedVaultRecords);
  const { records } = vaultRecordsState;
  const [selectedRecordIdx, setSelectedRecordIdx] = useState(
    vaultRecordsState.selectedRecordIndex ?? 0
  );
  const [openModal, setOpenModal] = useState(false);
  const [dataKey, setDataKey] = useState("");
  const [dataKeyDisplay, setDataKeyDisplay] = useState("");
  const [dataValue, setDataValue] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [selectedModalForm, setSelectedModalForm] = useState(""); // possible value : update-form, alert, create-record

  const handleRecordItemClicked = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selectedIndex: number
  ) => {
    updateRecordSelectedIndexFn(selectedIndex);
  };

  const updateRecordSelectedIndexFn = (selectedIndex: number) => {
    setSelectedRecordIdx(selectedIndex);
    dispatch(updateRecordSelectedIndex({ index: selectedIndex }));
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleDeleteRecord = () => {
    updateRecordSelectedIndexFn(selectedRecordIdx === 0 ? 0 : selectedRecordIdx - 1);
    dispatch(deleteRecordByIndex({ index: selectedRecordIdx }));
    setOpenModal(false);
  };

  const handleUpdateRecordNameFn = (keyName: string, value: string) => {
    dispatch(updateRecordName({ recordName: value }));
  };

  const handleModalOpen = (
    mode: string,
    keyIndex: number,
    keyDisplayName: string,
    value: string
  ) => {
    if (mode === "edit") {
      setSelectedModalForm("update-form");
      updateRecordSelectedIndexFn(keyIndex);
      setDataKey(keyIndex.toString());
      setDataKeyDisplay(keyDisplayName);
      setDataValue(value);
      setModalTitle(`Update ${keyDisplayName}`);
      setOpenModal(true);
    } else if (mode === "delete") {
      setSelectedModalForm("alert");
      updateRecordSelectedIndexFn(keyIndex);
      setOpenModal(true);
    } else if (mode === "create") {
      setSelectedModalForm("create-record");
      setModalTitle(`Create New Password Record`);
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (!vaultRecordsState.selectedRecordIndex) {
      dispatch(updateRecordSelectedIndex({ index: 0 }));
      setSelectedRecordIdx(vaultRecordsState.selectedRecordIndex!);
    }
  }, [vaultsState.selectedVaultIndex, vaultRecordsState.selectedRecordIndex]);

  return (
    <>
      <Stack
        direction='column'
        sx={{ flex: 1, display: "flex", alignItems: "stretch", margin: "5px" }}>
        <Box
          bgcolor='grey.400'
          sx={{
            flex: 1,
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
              Password&apos;s Key List
            </Typography>
            <Button
              variant='contained'
              size='small'
              onClick={(e) => {
                handleModalOpen("create", 0, "", "");
              }}>
              <Typography gutterBottom variant='h4' component='div' sx={{ fontSize: "120%" }}>
                Add Record
              </Typography>
            </Button>
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
            {records &&
              records.length !== 0 &&
              records.map((record, index) => {
                return (
                  <ListItem
                    selected={selectedRecordIdx === index}
                    key={index}
                    sx={{
                      pl: 4,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      borderRadius: "10px",
                    }}>
                    <Button
                      onClick={(e) => handleRecordItemClicked(e, index)}
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
                        {record.recordName}
                      </Typography>
                    </Button>
                    <IconButton
                      onClick={(e) =>
                        handleModalOpen("edit", index, "Pass Key Name", record.recordName)
                      }>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) =>
                        handleModalOpen("delete", index, "Pass Key Name", record.recordName)
                      }>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                );
              })}
          </List>
        </Box>
      </Stack>
      <CustomModal openModal={openModal} title={modalTitle} handleModalClose={handleModalClose}>
        {selectedModalForm === "update-form" && (
          <SingleUpdateInputFieldForm
            dataKey={dataKey}
            dataKeyDisplay={dataKeyDisplay}
            dataValue={dataValue}
            handleUpdate={handleUpdateRecordNameFn}
            handleClose={handleModalClose}
          />
        )}
        {selectedModalForm === "alert" && (
          <CancelConfirmForm
            message='Once Confirmed, Entire Record Data Will be deleted from memory. After Saving, changes will be permanent. Are you sure?'
            handleClose={handleModalClose}
            handleConfirm={handleDeleteRecord}
          />
        )}
        {selectedModalForm === "create-record" && (
          <CreateVaultRecodForm handleModalClose={handleModalClose} />
        )}
      </CustomModal>
    </>
  );
};

export default SignedInCenter;
