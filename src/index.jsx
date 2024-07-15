import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.scss';
import Store from './store/user-store'
import RouterConfig from "./route/RouterConfig"
import { RouterProvider } from "react-router-dom"
import { createContext } from 'react';
import { SnackbarProvider } from "notistack";
import { closeSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const store = new Store()

export const Context = createContext(store)

store.aboutUser();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<div style={{minHeight:'100vh',display:'flex'}}>
  <SnackbarProvider action={(snackbarId) => (
      <IconButton onClick={() => closeSnackbar(snackbarId)}>
        <CloseIcon htmlColor='#fff' />
      </IconButton>
  )}>
      <Context.Provider value={store}>
        <RouterProvider router={RouterConfig}/>
      </Context.Provider>
  </SnackbarProvider>
</div>
);
