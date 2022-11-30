import Navbar from "../Navbar";
import { Container, Snackbar, SnackbarProps, Alert, AlertProps } from "@mui/material";
import { forwardRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import ToastContainer from "../ui/toasts/ToastContainer";

const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(function SnackbarAlert(props, ref) {
  return <Alert elevation={23} ref={ref} {...props} sx={{ fontSize: "30px" }} />;
});

const Layout = (props: React.ComponentPropsWithoutRef<"p">) => {
  // const snackBarState = useAppSelector(getSnackBarState);
  const dispatch = useAppDispatch();
  // const snackBarProps: SnackbarProps = snackBarState.snackBarProps as SnackbarProps;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    // dispatch(updateSnackBarOpen({ open: false }));
  };

  const styles = {
    error: { backgroundColor: "blue", color: "orange" },
  };

  return (
    <>
      <Navbar />
      <Container disableGutters={true} maxWidth='xl'>
        {props.children}
      </Container>
      <ToastContainer />
    </>
  );
};

export default Layout;
