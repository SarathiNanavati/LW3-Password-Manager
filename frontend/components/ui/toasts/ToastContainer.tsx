import toastSlice, { getToastState } from "../../../features/toastSlice";
import { useAppSelector } from "../../../store/store";
import Toast from "./Toast";
import styles from "./ToastContainer.module.css";

type ToastContainerPropsType = {};

const ToastContainer = (props: ToastContainerPropsType) => {
  const { toasts } = useAppSelector(getToastState);
  return (
    <div
      className={`${styles.container}`}
      style={{
        display: `${toasts.length === 0 ? "none" : "flex"}`,
        flexDirection: "column-reverse",
        alignItems: "flex-end",
        justifyContent: "end",
      }}>
      {toasts.slice(-3).map((toast, index) => (
        <Toast key={index} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
