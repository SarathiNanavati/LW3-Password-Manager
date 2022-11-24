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
}
const initialState: UserState = {
  tokenId: 0,
  tokenCounter: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateContract: (state, action: PayloadAction<{ contract: PasswordManager }>) => ({
      ...state,
      contract: action.payload.contract,
    }),
    updateTokenId: (state, action: PayloadAction<{ tokenId: number }>) => ({
      ...state,
      tokenId: action.payload.tokenId,
    }),
    updateTokenCounter: (state, action: PayloadAction<{ counter: number }>) => ({
      ...state,
      tokenCounter: action.payload.counter,
    }),
    updateAddress: (state, action: PayloadAction<{ address: Address }>) => ({
      ...state,
      address: action.payload.address,
    }),
    updateSigner: (state, action: PayloadAction<{ signer: Signer }>) => ({
      ...state,
      signer: action.payload.signer,
    }),
  },
});

// export const getTokenId = async (address: string): Promise<number> => {
//   try {
//     console.log("tokenId", contract);
//     const tokenId = await contract.ownerToToken(address);
//     console.log("tokenId", tokenId.toString());
//     return parseInt(ethers.utils.formatEther(tokenId));
//   } catch (error) {
//     console.error("Ether-utils:getTokenId", error);
//     return 0;
//   }
// };

export const { updateContract, updateAddress, updateSigner, updateTokenId, updateTokenCounter } =
  userSlice.actions;

export const getUserState = (state: RootState) => state.user;

export default userSlice.reducer;
