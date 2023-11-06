import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const APP_BAR_HEIGHT = "58px";
const BOARD_BAR_HEIGHT = "60px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "50px";

// Create a theme instance.
const theme = createTheme({
  detail: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    detailContentHeight: BOARD_CONTENT_HEIGHT,
    coloumnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#556cd6",
      light: "#fff",
      secondary: "blue",
    },
    secondary: {
      main: "##172B4D",
    },

    error: {
      main: red.A400,
    },
    text: {
      secondary: red[500],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#dcdde1",
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-thumb:hover": { backgroundColor: "white" },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: { fontSize: "0.875rem" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiTypography-body1": {
            fontSize: "0.875rem",
          },
          textTransform: "inherit",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: "2px",
        },
      },
    },
  },
});

export default theme;
