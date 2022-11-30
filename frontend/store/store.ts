import { isEqual } from "lodash";
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { updateUserVaultUpdatedStatus } from "../features/userSlice";
import vaultSlice from "../features/vaultSlice";
import toastSlice from "../features/toastSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    user: userReducer,
    // snackBar: snackBarReducer,
    vault: vaultSlice,
    toast: toastSlice,
  },
  devTools: true,
});

const next = store.dispatch;

store.dispatch = function dispatchAndLog(action: any) {
  // console.log("dispatching", action);
  let result = next(action);
  // console.log("next state", store.getState());
  const res = isEqual(store.getState().user.oldVaultsState, store.getState().vault);
  next(updateUserVaultUpdatedStatus({ vaultStatus: !res }));
  return result;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
