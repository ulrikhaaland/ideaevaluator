import React from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import { Box } from "@mui/system";
import { Provider } from "mobx-react";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import LayoutPage from "./components/LayoutPage";

function App() {
  return (
    <>
      <Provider>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <LayoutPage></LayoutPage>
          </Box>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
