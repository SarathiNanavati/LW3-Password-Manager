import { Box, Typography,  Button } from "@mui/material";


type CancelConfirmFormProps = {
  message: string;
  handleConfirm: () => void;
  handleClose: () => void;
};

const CancelConfirmForm = (props: CancelConfirmFormProps) => {
  return (
    <>
      <Box sx={{ padding: "20px", width: "300px", display: "flex", flexDirection: "column" }}>
        <Typography gutterBottom variant='h5' component='div' sx={{ flex: 1, fontSize: "140%" }}>
          {props.message}
        </Typography>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          onClick={(e) => props.handleConfirm()}
          sx={{ flex: 1, marginTop: "20px" }}>
          Confirm
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='error'
          onClick={(e) => props.handleClose()}
          sx={{ flex: 1, marginTop: "20px" }}>
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default CancelConfirmForm;
