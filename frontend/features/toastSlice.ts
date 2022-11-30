import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { config } from "../config/config";
import { RootState } from "../store/store";
import { theme } from "../theme/theme";

const { notificationAutoHideTime } = config.application;
enum ToastPosition {
  BOTTOM_RIGHT = "bottom-right",
  BOTTOM_CENTER = "bottom-center",
  BOTTOM_LEFT = "bottom-left",
  CENTER_RIGHT = "center-right",
  CENTER_CENTER = "center-center",
  CENTER_LEFT = "center-left",
  TOP_RIGHT = "top-right",
  TOP_CENTER = "top-center",
  TOP_LEFT = "top-left",
}

export enum ToastSeverity {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

interface ToastStateType {
  toasts: ToastItem[];
}

export interface ToastItem {
  index: number;
  severity: ToastSeverity;
  title: string;
  description: string;
  // position: ToastPosition;
  closeTime: number;
}

const initialState: ToastStateType = {
  toasts: [],
};

const userSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    removeToast(state, action: PayloadAction<{ index: number }>) {
      state.toasts = state.toasts.filter((toast, index) => index !== action.payload.index);
      state.toasts.map((toast, index) => {
        toast.index = index;
        return toast;
      });
    },
    addSuccessToast(state, action: PayloadAction<{ title: string; description: string }>) {
      const newIndex = state.toasts.length;
      state.toasts.push({
        index: newIndex,
        severity: ToastSeverity.SUCCESS,
        title: action.payload.title,
        description: action.payload.description,
        closeTime: Date.now() + notificationAutoHideTime,
      });
    },
    addErrorToast(state, action: PayloadAction<{ title: string; description: string }>) {
      const newIndex = state.toasts.length;
      state.toasts.push({
        index: newIndex,
        severity: ToastSeverity.ERROR,
        title: action.payload.title,
        description: action.payload.description,
        closeTime: Date.now() + notificationAutoHideTime,
      });
    },
    addWarningToast(state, action: PayloadAction<{ title: string; description: string }>) {
      const newIndex = state.toasts.length;
      state.toasts.push({
        index: newIndex,
        severity: ToastSeverity.WARNING,
        title: action.payload.title,
        description: action.payload.description,
        closeTime: Date.now() + notificationAutoHideTime,
      });
    },
    addInfoToast(state, action: PayloadAction<{ title: string; description: string }>) {
      const newIndex = state.toasts.length;
      state.toasts.push({
        index: newIndex,
        severity: ToastSeverity.INFO,
        title: action.payload.title,
        description: action.payload.description,
        closeTime: Date.now() + notificationAutoHideTime,
      });
    },
  },
});

export const { removeToast, addErrorToast, addInfoToast, addSuccessToast, addWarningToast } =
  userSlice.actions;

export const getToastState = (state: RootState) => state.toast;

export default userSlice.reducer;
