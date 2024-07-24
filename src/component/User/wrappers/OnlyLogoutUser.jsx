import { useEffect, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../../../User";
import Loading from "../../general/Loading/Loading";
import { USER_ROUTE } from "../../../route/RouterConfig";

function OnlyLogoutUser({ children }) {
   const { isLoading, isAuth } = useContext(Context);

   if (isLoading) return <Loading />;

   if (isAuth === false) return children;

   return <Navigate to={USER_ROUTE} />;
}

export default observer(OnlyLogoutUser);
