import { useEffect, useContext, useState } from "react"
import { Navigate } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import Loading from "../Loading/Loading";


function OnlyLogoutUser({ children }) {
   const { isLoading,isAuth } = useContext(Context)

   if (isLoading) return <Loading/>

   if (isAuth === false) return children

   return <Navigate to='/' />

}

export default observer(OnlyLogoutUser);