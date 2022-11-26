import { Box, Typography, TextField, Button } from "@mui/material";
import { trim } from "lodash";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addNewVault, getVaultsState, updateVaultName } from "../../features/vaultSlice";

type CreateVaultFormProps = {
  itemIndex?: number;
  handleModalClose: () => void;
  editMode?: boolean;
};

const CreateVaultForm = (props: CreateVaultFormProps) => {
  const vaultState = useAppSelector(getVaultsState);
  const [vaultName, setVaultName] = useState(
    props.editMode ? vaultState.vaults[props.itemIndex].vaultName : ""
  );

  const [vaultErrorMessage, setVaultErrorMessage] = useState("");
  const [vaultError, setVaultError] = useState(false);

  const dispatch = useAppDispatch();

  const handleInput = (e: any) => {
    setVaultName(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (trim(vaultName) === "") {
      setVaultErrorMessage("Please provide a Vault Name ");
      setVaultError(true);
    } else {
      if (props.editMode) {
        dispatch(updateVaultName({ index: props.itemIndex, updatedVaultName: vaultName }));
      } else {
        dispatch(addNewVault({ vaultName }));
      }
      props.handleModalClose();
    }
    return;
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box sx={{ padding: "20px", width: "300px", display: "flex", flexDirection: "column" }}>
          <TextField
            error={vaultError}
            label='Name'
            id='margin-normal'
            name='Vault Name'
            value={vaultName}
            helperText={vaultErrorMessage}
            onChange={handleInput}
            sx={{ flex: 1 }}
          />
          <br />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{ flex: 1, marginTop: "20px" }}>
            {props.editMode ? "Update Vault Name" : "Create Vault Name"}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateVaultForm;
