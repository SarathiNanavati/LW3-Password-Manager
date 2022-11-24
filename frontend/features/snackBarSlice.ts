import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Signer } from "ethers";
import { Address } from "wagmi";
import { PasswordManager } from "../constants/types/PasswordManager";
import type { RootState } from "../store/store";
import { AlertColor, SnackbarProps } from "@mui/material";
import { config } from "../config/config";

interface SnackBarState {
  message: string;
  severity: AlertColor;
  snackBarProps: {
    open: boolean;
    autoHideDuration: number;
    anchorOrigin: {
      vertical: string;
      horizontal: string;
    };
  };
}
const initialState: SnackBarState = {
  message: "",
  severity: "info" as AlertColor,
  snackBarProps: {
    open: false,
    autoHideDuration: config.application.snakeBarAutoHideDuration,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
  },
};

const snackBarSlice = createSlice({
  name: "snack-bar",
  initialState,
  reducers: {
    updateSnackBarMessage: (state, action: PayloadAction<{ message: string }>) => ({
      ...state,
      message: action.payload.message,
    }),
    updateSnackBarOpen: (state, action: PayloadAction<{ open: boolean }>) => ({
      ...state,
      snackBarProps: {
        ...state.snackBarProps,
        open: action.payload.open,
      },
    }),
    updateSnackBarSeverity: (state, action: PayloadAction<{ severity: AlertColor }>) => ({
      ...state,
      severity: action.payload.severity,
    }),
  },
});

export const { updateSnackBarMessage, updateSnackBarOpen, updateSnackBarSeverity } =
  snackBarSlice.actions;

export const getSnackBarState = (state: RootState) => state.snackBar;

export default snackBarSlice.reducer;
