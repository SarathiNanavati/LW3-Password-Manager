import { Box, Typography, TextField, Button } from "@mui/material";
import { trim } from "lodash";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addNewVault, getVaultsState, updateVaultName } from "../../features/vaultSlice";

type SingleUpdateInputFieldFormProps = {
  dataKey: string;
  dataKeyDisplay: string;
  dataValue: string;
  handleUpdate: (keyName: string, value: string) => void;
  handleClose: () => void;
};

const SingleUpdateInputFieldForm = (props: SingleUpdateInputFieldFormProps) => {
  const [text, setText] = useState(props.dataValue);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const handleInput = (e: any) => {
    setText(e.target.value);
  };
  const generateRandomePassword = () => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";
    let password = "";

    for (let i = 1; i <= 16; i++) {
      password += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    console.log("asdfasdfasdf", password);
    setText(password);
  };
  const handleFormUpdate = (e: any) => {
    e.preventDefault();
    if (trim(text) === "") {
      setErrorMessage("Please provide valid input");
      setError(true);
    } else {
      props.handleUpdate(props.dataKey, text);
      props.handleClose();
    }
    return;
  };

  return (
    <>
      <Box
        sx={{
          padding: "20px",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
        {/* <Typography gutterBottom variant='h5' component='div' sx={{ flex: 1, fontSize: "140%" }}>
          {`Please Update ${props.dataKeyDisplay}`}
        </Typography> */}
        <TextField
          error={error}
          label={props.dataKeyDisplay}
          id='margin-normal'
          name={props.dataKey}
          value={text}
          helperText={errorMessage}
          onChange={handleInput}
          sx={{ flex: 1 }}
        />
        {props.dataKeyDisplay === "Password" && (
          <Button
            type='button'
            variant='outlined'
            color='primary'
            onClick={(e) => generateRandomePassword()}
            size='small'
            sx={{ flex: 1, marginTop: "20px" }}>
            Generate Random Password
          </Button>
        )}
        <Button
          type='submit'
          variant='contained'
          color='primary'
          onClick={(e) => handleFormUpdate(e)}
          sx={{ flex: 1, marginTop: "20px" }}>
          Update
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='error'
          onClick={(e) => props.handleClose()}
          sx={{ flex: 1, marginTop: "20px" }}>
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default SingleUpdateInputFieldForm;
