import { Alert, AlertTitle, Button, Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { config } from "../../../config/config";
import { removeToast, ToastItem } from "../../../features/toastSlice";
import { useAppDispatch } from "../../../store/store";
import styles from "./Toast.module.css";

type ToastPropsType = {
  toast: ToastItem;
};

const Toast = ({ toast }: ToastPropsType) => {
  const [hideToast, setHideToast] = useState(false);
  const dispatch = useAppDispatch();

  const deleteToast = useCallback(() => {
    dispatch(removeToast({ index: toast.index }));
    setHideToast(true);
  }, []);

  useEffect(() => {
    const remainingTime = toast.closeTime - Date.now();
    if (remainingTime < 0) deleteToast();
    const interval = setInterval(() => {
      deleteToast();
    }, remainingTime);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Box
        key={toast.index}
        className={`${styles.notification} ${styles.toast}`} /// //   ${styles[toast.position]} ${hideToast ? styles.hide : styles.show}
        // style={{
        //   marginBottom: `${5 * toast.index + 1}rem`,
        // }}
      >
        <div>
          <Alert
            severity={toast.severity}
            action={
              <Button color='inherit' size='small' onClick={() => deleteToast()}>
                X
              </Button>
            }>
            <AlertTitle>{toast.title}</AlertTitle>
            {toast.description}
          </Alert>
        </div>
      </Box>
    </>
  );
};

export default Toast;
