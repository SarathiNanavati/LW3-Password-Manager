import { isEqual } from "lodash";
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { updateUserVaultUpdatedStatus } from "../features/userSlice";
import snackBarReducer from "../features/snackBarSlice";
import vaultSlice from "../features/vaultSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    user: userReducer,
    snackBar: snackBarReducer,
    vault: vaultSlice,
  },
  devTools: true,
});

const oldVaultsState = store.getState().vault;
const next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  const res = isEqual(oldVaultsState, store.getState().vault);
  next(updateUserVaultUpdatedStatus({ vaultStatus: !res }));
  return result;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
