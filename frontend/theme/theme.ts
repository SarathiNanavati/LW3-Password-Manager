import { createTheme, colors } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#ffa726",
      light: "#ffb851",
      dark: "#b2741a",
      contrastText: "#fff",
    },
    primary: {
      main: "#e65100",
      light: "#eb7333",
      dark: "#a13800",
      contrastText: "#eee",
    },
    error: {
      main: "#fa3c4c",
      light: "#ff7478",
      dark: "#c00024",
      contrastText: "#fff",
    },
    warning: {
      main: "#ffc300",
      light: "#fff54f",
      dark: "#c79300",
      contrastText: "#fff",
    },
    success: {
      main: "#0084ff",
      light: "#69b3ff",
      dark: "#0058cb",
      contrastText: "#fff",
    },
    info: {
      main: "#44bec7",
      light: "#7ef1fa",
      dark: "#008d96",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: '"Syne","Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Syne","Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Syne","Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 800 },
    h3: { fontFamily: '"Syne","Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Syne","Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Syne","Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 400 },
    h6: { fontFamily: '"Syne","Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 300 },
    subtitle1: { fontFamily: '"Syne","Roboto", "Helvetica", "Arial", sans-serif' },
    subtitle2: { fontFamily: '"Syne","Roboto", "Helvetica", "Arial", sans-serif' },
    body1: { fontFamily: '"Syne","Roboto", "Helvetica", "Arial", sans-serif' },
    body2: { fontFamily: '"Syne","Roboto", "Helvetica", "Arial", sans-serif' },
    button: { fontFamily: '"Syne","Roboto", "Helvetica", "Arial", sans-serif' },
    caption: { fontFamily: '"Syne","Roboto", "Helvetica", "Arial", sans-serif' },
    overline: { fontFamily: '"Syne","Roboto", "Helvetica", "Arial", sans-serif' },
  },
});
