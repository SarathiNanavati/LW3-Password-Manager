import { Grid, Card, CardContent } from "@mui/material";
import SignedInRight from "./SignedInRight";
import SignedInLeft from "./SignedInLeft";
import SignedInCenter from "./SignedInCenter";

type SignedInProps = {};

const SignedIn = (props: SignedInProps) => {
  return (
    <>
      <Card sx={{ marginY: 5, bgcolor: "grey.200", color: "common.black" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "800px",
          }}>
          <Grid container sx={{ flex: 1, display: "flex", justifyContent: "space-evenly" }}>
            <Grid item sx={{ flex: 1, display: "flex" }}>
              <SignedInLeft />
            </Grid>
            <Grid item sx={{ flex: 1, display: "flex" }}>
              <SignedInCenter />
            </Grid>
            <Grid item sx={{ flex: 1, display: "flex" }}>
              <SignedInRight />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default SignedIn;
