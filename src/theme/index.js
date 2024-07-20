import { blue, grey } from "@mui/material/colors";

const colors = {
   pinkRose: {
      DEFAULT: "#EC4899",
      50: "#FDEEF6",
      100: "#FBDCEB",
      200: "#F8B7D7",
      300: "#F492C2",
      400: "#F06DAE",
      500: "#EC4899",
      600: "#E4187D",
      700: "#B11261",
      800: "#7F0D45",
      900: "#4C0829",
      950: "#32051B",
   },
};

export const themeSettings = {
   palette: {
      primary: {
         main: colors.pinkRose.DEFAULT,
         dark: colors.pinkRose[700],
         light: colors.pinkRose[300],
         contrastText: colors.pinkRose[50],
      },
      secondary: {
         main: grey[600],
         dark: "#111",
         light: "#363636",
         contrastText: grey[50],
      },
      background: {
         main: "rgb(37, 37, 37)",
         dark: "#111",
         light: grey[800],
         contrastText: grey[700],
      },
   },
};
