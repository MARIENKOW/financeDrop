import AdminStore from "./store/admin-store";

import { createContext } from "react";
import { Outlet } from "react-router-dom";

export const adminStore = new AdminStore();

export const AdminContext = createContext(adminStore);

const Admin = () => {
   console.log('sssss');
   adminStore.aboutAdmin();
   return (
      <AdminContext.Provider value={adminStore}>
         <Outlet />
      </AdminContext.Provider>
   );
};

export default Admin;
