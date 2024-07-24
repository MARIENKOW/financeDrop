import { useEffect, useContext, useState } from "react"
import { Navigate } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import Loading from "../../general/Loading/Loading";
import { AdminContext } from "../../../Admin";
import { ADMIN_SIGN_IN_ROUTE } from "../../../route/RouterConfig";


function OnlyLogoutAdmin({ children }) {
   const { isAuth,isLoading } = useContext(AdminContext)

   if (isLoading) return <Loading/>

   if (isAuth === true) return children

   return <Navigate to={ADMIN_SIGN_IN_ROUTE} replace />

}

export default observer(OnlyLogoutAdmin);