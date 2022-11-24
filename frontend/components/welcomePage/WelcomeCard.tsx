import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";

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
      <CardContent sx={{ display: "flex", flexDirection: "row", height: "320px" }}>
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
          <Typography gutterBottom variant='h4' component='div'>
            {title.toUpperCase()}
          </Typography>
          <Typography gutterBottom variant='h5' component='div'>
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
