import { merge } from "lodash";
import { darkTheme, Theme } from "@rainbow-me/rainbowkit";
import { theme } from "./theme";

const CustomRainbowTheme: Theme = merge(darkTheme(), {
  colors: {
    accentColor: theme.palette.primary.main,
    accentColorForeground: theme.palette.primary.contrastText,
  },
  fonts: {
    body: '"Syne","Roboto", "Helvetica", "Arial", sans-serif',
  },
} as Theme);
console.log(CustomRainbowTheme);

export default CustomRainbowTheme;
