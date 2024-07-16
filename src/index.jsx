import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.scss';
import { SnackbarProvider } from "notistack";
import { closeSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RouterConfig from "./route/RouterConfig"
import { RouterProvider } from "react-router-dom"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<div style={{minHeight:'100vh',display:'flex'}}>
  <SnackbarProvider action={(snackbarId) => (
      <IconButton onClick={() => closeSnackbar(snackbarId)}>
        <CloseIcon htmlColor='#fff' />
      </IconButton>
  )}>
      <RouterProvider router={RouterConfig}></RouterProvider>
  </SnackbarProvider>
</div>
);
