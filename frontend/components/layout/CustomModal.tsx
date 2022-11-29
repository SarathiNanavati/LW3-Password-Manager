import { Modal, Box, Card, CardHeader, CardContent, Backdrop, Fade } from "@mui/material";

type CustomModalProps = {
  openModal: boolean;
  title: string;
  handleModalClose: () => void;
  children: React.ReactNode;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.default",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomModal = (props: CustomModalProps) => {
  return (
    <>
      <Modal
        open={props.openModal}
        onClose={props.handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={props.openModal}>
          <Box sx={style}>
            <Card>
              <CardHeader title={props.title} />
              <CardContent>{props.children}</CardContent>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default CustomModal;
