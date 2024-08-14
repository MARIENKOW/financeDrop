import { useQuery } from "@tanstack/react-query";
import UserStore from "./store/user-store";

import { createContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserService from "./services/UserService";

export const store = new UserStore();

export const Context = createContext();

const User = () => {
   // store.aboutUser();
   const { isSuccess, error, data } = useQuery({
      queryKey: ["aboutUser"],
      queryFn: async () => {
         console.log("local");
         if (!localStorage.getItem("accessToken"))
            throw { response: { status: 401 } };
         console.log("req");
         return UserService.aboutUser();
      },
      select: ({ data }) => data,
      retry: false,
   });

   useEffect(() => {
      if (isSuccess) {
         store.setUser({ ...data });
         store.setAuth(true);
         store.setIsLoading(false);
      }
   }, [data, isSuccess]);

   useEffect(() => {
      console.log(error);
      if (error?.response?.status === 401) {
         store.setUnauthorized();
         store.setIsLoading(false);
      }
   }, [error]);

   return (
      <Context.Provider value={store}>
         <Outlet />
      </Context.Provider>
   );
};

export default User;
