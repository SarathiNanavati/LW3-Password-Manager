import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { AlertColor } from "@mui/material";
import { config } from "../config/config";
import _ from "lodash";

export enum RecordType {
  WEBSITE = "WEBSITE",
  CREDIT_CARD = "CREDIT_CARD",
  DOCUMENT = "DOCUMENT",
}

export type VaultStateType = {
  vaults: VaultItemType[];
  selectedVaultIndex?: number | null;
};

export type VaultItemType = {
  vaultName: string;
  records?: RecordItemType[];
  selectedRecordIndex?: number | null;
};

export type RecordItemType = {
  recordName: string;
  recordType: RecordType;
  recordAttributes: WebsiteType; // | CreditCardType | DocumentType
};

export type WebsiteType = {
  domaninNameOrUrl: string;
  userNameOrEmail: string;
  passwordOrSecret: string;
};

export type CreditCardType = {
  creditCardName: string;
  creditCardNo: string;
  creditCardCVV: string;
  creditCardExpireyDate: string;
};

export type DocumentType = {
  documentName: string;
  documentData: string; //// pendings
};

const initialState: VaultStateType = {
  vaults: [
    {
      vaultName: "Personal Vault",
      records: [],
    },
  ],
  selectedVaultIndex: 0,
};

const vaultsSlice = createSlice({
  name: "vault",
  initialState,
  reducers: {
    updateVaultsState(state, action: PayloadAction<{ vaultsState: VaultStateType }>) {
      state.vaults = action.payload.vaultsState.vaults;
      state.selectedVaultIndex = action.payload.vaultsState.selectedVaultIndex;
    },
    addNewVault(state, action: PayloadAction<{ vaultName: string }>) {
      state.vaults.push({ vaultName: action.payload.vaultName, records: [] });
    },
    addNewVaultRecord(
      state,
      action: PayloadAction<{
        recordName: string;
        domainName: string;
        userName: string;
        password: string;
      }>
    ) {
      const vaultIndex = state.selectedVaultIndex ?? 0;
      state.vaults[vaultIndex].records.push({
        recordName: action.payload.recordName,
        recordType: RecordType.WEBSITE,
        recordAttributes: {
          domaninNameOrUrl: action.payload.domainName,
          userNameOrEmail: action.payload.userName,
          passwordOrSecret: action.payload.password,
        },
      });

      state.vaults[vaultIndex].selectedRecordIndex = state.vaults[vaultIndex].records?.length - 1;
    },
    updateVaultName(
      state,
      action: PayloadAction<{ index: number | undefined; updatedVaultName: string }>
    ) {
      if (action.payload.index)
        state.vaults[action.payload.index].vaultName = action.payload.updatedVaultName;
    },
    deleteVaultByIndex(state, action: PayloadAction<{ index: number | null }>) {
      if (action.payload.index || action.payload.index === 0) {
        if (state.vaults.length > 1) {
          state.vaults = state.vaults.filter((vault, index) => {
            return index !== action.payload.index;
          });
        }
      }
    },
    deleteRecordByIndex(state, action: PayloadAction<{ index: number | null }>) {
      if (action.payload.index || action.payload.index === 0) {
        const vaultIndex = state.selectedVaultIndex ?? 0;

        if (state.vaults[vaultIndex].records && state.vaults[vaultIndex].records?.length > 0) {
          state.vaults[vaultIndex].records = state.vaults[vaultIndex].records.filter(
            (record, index) => {
              return index !== action.payload.index;
            }
          );
        }
      }
    },
    updateVaultSelectedIndex(state, action: PayloadAction<{ index: number }>) {
      state.selectedVaultIndex = action.payload.index;
    },
    updateRecordSelectedIndex(state, action: PayloadAction<{ index: number }>) {
      state.vaults[state.selectedVaultIndex].selectedRecordIndex = action.payload.index;
    },
    updateRecordAttribute(state, action: PayloadAction<{ key: string; value: string }>) {
      const vaultIndex = state.selectedVaultIndex ?? 0;
      const recordIndex = state.vaults[vaultIndex].selectedRecordIndex ?? 0;

      state.vaults[vaultIndex].records[recordIndex].recordAttributes[action.payload.key] =
        action.payload.value;
    },
    updateRecordName(state, action: PayloadAction<{ recordName: string }>) {
      const vaultIndex = state.selectedVaultIndex ?? 0;
      const recordIndex = state.vaults[vaultIndex].selectedRecordIndex ?? 0;

      state.vaults[vaultIndex].records[recordIndex].recordName = action.payload.recordName;
    },
  },
});

export const {
  addNewVault,
  addNewVaultRecord,
  updateVaultName,
  deleteVaultByIndex,
  deleteRecordByIndex,
  updateVaultSelectedIndex,
  updateRecordSelectedIndex,
  updateRecordAttribute,
  updateRecordName,
  updateVaultsState,
} = vaultsSlice.actions;

export const getVaultsState = (state: RootState) => state.vault;
export const getSelectedVaultRecords = (state: RootState) =>
  state.vault.vaults[state.vault.selectedVaultIndex];

export const getSelectedVaultRecord = (state: RootState) => {
  const vaultIndex = state.vault.selectedVaultIndex ?? 0;
  const recordIndex = state.vault.vaults[state.vault.selectedVaultIndex!].selectedRecordIndex ?? 0;

  if (
    state.vault.vaults[vaultIndex] &&
    state.vault.vaults[vaultIndex].records &&
    state.vault.vaults[vaultIndex].records?.length != 0
  )
    return state.vault.vaults[vaultIndex].records[recordIndex];
  else {
    return null;
  }
};

export const getSelectedVaultIndex = (state: RootState) => state.vault.selectedVaultIndex ?? 0;
export const getSelectedRecordIndex = (state: RootState) =>
  state.vault.vaults[state.vault.selectedVaultIndex!].selectedRecordIndex ?? 0;

export default vaultsSlice.reducer;
