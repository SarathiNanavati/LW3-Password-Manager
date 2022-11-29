import { useSnackbar, OptionsObject, WithSnackbarProps } from "notistack";
import React from "react";

export enum VariantType {
  default = "default",
  error = "error",
  success = "success",
  warning = "warning",
  info = "info",
}

interface SnackProps {
  setUseSnackbarRef: (showSnackbar: WithSnackbarProps) => void;
}

const InnerSnackbarUtilsConfigurator: React.FC<SnackProps> = (props) => {
  props.setUseSnackbarRef(useSnackbar());
  return null;
};

let useSnackbarRef: WithSnackbarProps;
const setUseSnackbarRef = (useSnackbarRefProp: WithSnackbarProps) => {
  useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = (props: { children?: React.ReactNode }) => {
  return <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />;

  {
    /* {props.children}
    </InnerSnackbarUtilsConfigurator> */
  }
};

//sets a default length for all Snack messages
const defaultSnackMessageLength = 1000;
// pending

const trimMessage = (msg: string, length: number = defaultSnackMessageLength) => {
  return msg.substring(0, length);
};

const success = (msg: string, options: OptionsObject = {}) => {
  toast(trimMessage(msg), { ...options, variant: VariantType.success });
};
const warning = (msg: string, options: OptionsObject = {}) => {
  toast(trimMessage(msg), { ...options, variant: VariantType.warning });
};
const info = (msg: string, options: OptionsObject = {}) => {
  toast(trimMessage(msg), { ...options, variant: VariantType.info });
};
const error = (msg: string, options: OptionsObject = {}) => {
  toast(trimMessage(msg), { ...options, variant: VariantType.error });
};
const toast = (msg: string, options: OptionsObject = {}) => {
  useSnackbarRef.enqueueSnackbar(msg, options);
};

export default { success, warning, info, error, toast };
