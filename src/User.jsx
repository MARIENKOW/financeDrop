import UserStore from './store/user-store'

import { createContext } from 'react';
import { Outlet } from 'react-router-dom';

export const store = new UserStore()

export const Context = createContext(store)


const User = () => {

   store.aboutUser();
   
   return(
      <Context.Provider value={store}>
         <Outlet/>
    </Context.Provider>
   )
}

export default User