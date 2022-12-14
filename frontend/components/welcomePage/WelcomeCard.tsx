import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { theme } from "../../theme/theme";

type WelcomeCardProps = {
  iconUrl: string;
  iconSize?: number;
  title: string;
  subTitle: string;
  description: string;
};

const WelcomeCard = ({
  iconUrl,
  iconSize = 128,
  title,
  subTitle,
  description,
}: WelcomeCardProps) => {
  return (
    <Card sx={{ bgcolor: "grey.200", color: "common.black" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
          },
        }}>
        <Avatar
          src={iconUrl}
          sx={{
            bgcolor: "primary.light",
            textAlign: "center",
            width: iconSize,
            height: iconSize,
            marginY: "auto",
          }}
        />
        <Box sx={{ flex: 1, marginLeft: "30px", marginTop: "10px" }}>
          <Typography
            gutterBottom
            component='div'
            sx={{
              fontSize: "1.5rem",
              fontWeight: "600",
              [theme.breakpoints.down("md")]: {
                fontSize: "1rem",
                fontWeight: "600",
              },
              [theme.breakpoints.down("lg")]: {
                fontSize: "1.2rem",
                fontWeight: "600",
              },
            }}>
            {title.toUpperCase()}
          </Typography>
          <Typography
            gutterBottom
            component='div'
            sx={{
              fontSize: "1.5rem",
              fontWeight: "400",
              [theme.breakpoints.down("md")]: {
                fontSize: "1rem",
                fontWeight: "400",
              },
            }}>
            {subTitle}
          </Typography>
          <Typography gutterBottom variant='body1' component='p'>
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
