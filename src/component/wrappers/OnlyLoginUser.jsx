import { useEffect, useContext, useState } from "react"
import { Navigate } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import Loading from "../Loading/Loading";


function OnlyLogoutUser({ children }) {
   const { isAuth,isLoading } = useContext(Context)

   if (isLoading) return <Loading/>

   if (isAuth === true) return children

   return <Navigate to='/SignIn' replace />

}

export default observer(OnlyLogoutUser);