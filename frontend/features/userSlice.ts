import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Signer } from "ethers";
import { Address } from "wagmi";
import { PasswordManager } from "../constants/types/PasswordManager";
import type { RootState } from "../store/store";

interface UserState {
  signer?: Signer;
  tokenId: number;
  tokenCounter: number;
  address?: Address;
  contract?: PasswordManager;
  ensName?: string | null;
  ensAvatarUrl?: string | null;
  isVaultUpdated: boolean;
}
const initialState: UserState = {
  tokenId: 0,
  tokenCounter: 0,
  address: `0x0`,
  ensName: "",
  ensAvatarUrl: "",
  isVaultUpdated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => initialState,
    updateContract: (state, action: PayloadAction<{ contract: PasswordManager }>) => ({
      ...state,
      contract: action.payload.contract,
    }),
    updateUserTokenId: (state, action: PayloadAction<{ tokenId: number }>) => ({
      ...state,
      tokenId: action.payload.tokenId,
    }),
    updateTokenCounter: (state, action: PayloadAction<{ counter: number }>) => ({
      ...state,
      tokenCounter: action.payload.counter,
    }),
    updateUserAddress: (state, action: PayloadAction<{ address: Address }>) => ({
      ...state,
      address: action.payload.address,
    }),
    updateSigner: (state, action: PayloadAction<{ signer: Signer }>) => ({
      ...state,
      signer: action.payload.signer,
    }),
    updateUserEnsName: (state, action: PayloadAction<{ ensName: string }>) => ({
      ...state,
      ensName: action.payload.ensName,
    }),
    updateUserEnsAvatarUrl: (state, action: PayloadAction<{ ensAvatarUrl: string }>) => ({
      ...state,
      ensAvatarUrl: action.payload.ensAvatarUrl,
    }),
    updateUserVaultUpdatedStatus: (state, action: PayloadAction<{ vaultStatus: boolean }>) => ({
      ...state,
      isVaultUpdated: action.payload.vaultStatus,
    }),
  },
});

export const {
  resetUser,
  updateContract,
  updateUserTokenId,
  updateTokenCounter,
  updateUserAddress,
  updateSigner,
  updateUserEnsName,
  updateUserEnsAvatarUrl,
  updateUserVaultUpdatedStatus,
} = userSlice.actions;

export const getUserState = (state: RootState) => state.user;
export const getMaskedUserAddress = (state: RootState) => {
  return `${state.user.address!.substr(0, 5)}...${state.user.address!.substr(
    state.user.address!.length - 5
  )}`;
};

export default userSlice.reducer;
