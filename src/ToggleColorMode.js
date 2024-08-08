import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MyApp from "./MyApp";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
                text: {
                  primary: "#ffffff",
                  secondary: "#aaaaaa",
                },
              }
            : {
                background: {
                  default: "#f9e0bb",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#000000",
                  secondary: "#4f4f4f",
                },
              }),
        },
        typography: {
          fontFamily: "Arial, sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
