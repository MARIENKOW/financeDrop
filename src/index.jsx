import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.scss";
import { SnackbarProvider } from "notistack";
import { closeSnackbar } from "notistack";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RouterConfig from "./route/RouterConfig";
import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";
import {
   QueryClient,
   QueryClientProvider,
 } from '@tanstack/react-query'

const theme = createTheme(themeSettings);
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <ThemeProvider theme={theme}>
      <SnackbarProvider
         action={(snackbarId) => (
            <IconButton onClick={() => closeSnackbar(snackbarId)}>
               <CloseIcon htmlColor="#fff" />
            </IconButton>
         )}
      >
         <QueryClientProvider client={queryClient}>
            <Box
               sx={{
                  minHeight: "100vh",
                  display: "flex",
                  flexDirection:'column',
                  bgcolor: theme.palette.background.dark,
               }}
            >
               <RouterProvider router={RouterConfig}></RouterProvider>
            </Box>
         </QueryClientProvider>
      </SnackbarProvider>
   </ThemeProvider>
);
