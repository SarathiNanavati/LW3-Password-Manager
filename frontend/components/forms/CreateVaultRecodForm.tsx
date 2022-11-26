import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { trim } from "lodash";
import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { addNewVaultRecord } from "../../features/vaultSlice";

type CreateVaultRecodFormProps = {
  handleModalClose: () => void;
};

const CreateVaultRecodForm = (props: CreateVaultRecodFormProps) => {
  const [recordData, setRecordData] = useState({
    recordName: "",
    domaninNameOrUrl: "",
    userNameOrEmail: "",
    passwordOrSecret: "",
    showPassword: false,
  });

  const [recordDataErrorMessage, setRecordDataErrorMessage] = useState({
    recordName: "",
    domaninNameOrUrl: "",
    userNameOrEmail: "",
    passwordOrSecret: "",
  });
  const [recordDataError, setRecordDataError] = useState({
    recordName: false,
    domaninNameOrUrl: false,
    userNameOrEmail: false,
    passwordOrSecret: false,
  });

  const [vaultErrorMessage, setVaultErrorMessage] = useState("");
  const [vaultError, setVaultError] = useState(false);

  const handleInputChange = (e: any) => {
    setRecordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickShowPassword = () => {
    setRecordData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const dispatch = useAppDispatch();

  const generateRandomePassword = () => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";
    let password = "";

    for (let i = 1; i <= 16; i++) {
      password += str.charAt(Math.floor(Math.random() * str.length + 1));
    }

    setRecordData((prev) => ({ ...prev, passwordOrSecret: password }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let validationFailedFlag = false;
    console.log(recordData);
    setRecordDataError({
      recordName: false,
      domaninNameOrUrl: false,
      userNameOrEmail: false,
      passwordOrSecret: false,
    });
    setRecordDataErrorMessage({
      recordName: "",
      domaninNameOrUrl: "",
      userNameOrEmail: "",
      passwordOrSecret: "",
    });

    if (trim(recordData.recordName) === "") {
      validationFailedFlag = true;
      setRecordDataErrorMessage((prev) => ({
        ...prev,
        recordName: "Please provide valid Input",
      }));
      setRecordDataError((prev) => ({
        ...prev,
        recordName: true,
      }));
    }
    if (trim(recordData.domaninNameOrUrl) === "") {
      validationFailedFlag = true;
      setRecordDataErrorMessage((prev) => ({
        ...prev,
        domaninNameOrUrl: "Please provide valid Input",
      }));
      setRecordDataError((prev) => ({
        ...prev,
        domaninNameOrUrl: true,
      }));
    }
    if (trim(recordData.userNameOrEmail) === "") {
      validationFailedFlag = true;
      setRecordDataErrorMessage((prev) => ({
        ...prev,
        userNameOrEmail: "Please provide valid Input",
      }));
      setRecordDataError((prev) => ({
        ...prev,
        userNameOrEmail: true,
      }));
    }
    if (trim(recordData.passwordOrSecret) === "") {
      validationFailedFlag = true;
      setRecordDataErrorMessage((prev) => ({
        ...prev,
        passwordOrSecret: "Please provide valid Input",
      }));
      setRecordDataError((prev) => ({
        ...prev,
        passwordOrSecret: true,
      }));
    }

    if (!validationFailedFlag) {
      dispatch(
        addNewVaultRecord({
          recordName: recordData.recordName,
          domainName: recordData.domaninNameOrUrl,
          userName: recordData.userNameOrEmail,
          password: recordData.passwordOrSecret,
        })
      );

      props.handleModalClose();
    }
    return;
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box sx={{ padding: "20px", width: "300px", display: "flex", flexDirection: "column" }}>
          <TextField
            error={recordDataError.recordName}
            label='Record Name'
            name='recordName'
            value={recordData.recordName}
            helperText={recordDataErrorMessage.recordName}
            onChange={handleInputChange}
            sx={{ flex: 1 }}
          />
          <br />
          <TextField
            error={recordDataError.domaninNameOrUrl}
            label='Domain Name Or URL'
            name='domaninNameOrUrl'
            value={recordData.domaninNameOrUrl}
            helperText={recordDataErrorMessage.domaninNameOrUrl}
            onChange={handleInputChange}
            sx={{ flex: 1 }}
          />
          <br />
          <TextField
            error={recordDataError.userNameOrEmail}
            label='User Name Or Email'
            name='userNameOrEmail'
            value={recordData.userNameOrEmail}
            helperText={recordDataErrorMessage.userNameOrEmail}
            onChange={handleInputChange}
            sx={{ flex: 1 }}
          />
          <br />

          <FormControl sx={{ flex: 1, display: "flex" }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
            <OutlinedInput
              error={recordDataError.passwordOrSecret}
              name='passwordOrSecret'
              type={recordData.showPassword ? "text" : "password"}
              value={recordData.passwordOrSecret}
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={handleClickShowPassword} edge='end'>
                    {recordData.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
          <br />

          <Button
            type='button'
            variant='outlined'
            color='primary'
            onClick={generateRandomePassword}
            size='small'
            sx={{ flex: 1 }}>
            Generate Random Password
          </Button>

          {/* <TextField
            error={recordDataError.passwordOrSecret}
            label='Password/Secret'
            name='passwordOrSecret'
            type='password'
            value={recordData.passwordOrSecret}
            helperText={recordDataErrorMessage.passwordOrSecret}
            onChange={handleInputChange}
            sx={{ flex: 1 }}
          /> */}
          <br />
          <Button type='submit' variant='contained' color='primary' sx={{ flex: 1 }}>
            Create Record
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateVaultRecodForm;
