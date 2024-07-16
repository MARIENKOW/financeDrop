import { useEffect, useContext, useState } from "react"
import { Navigate } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import Loading from "../../general/Loading/Loading";
import { AdminContext } from "../../../Admin";


function OnlyLogoutAdmin({ children }) {
   const { isLoading,isAuth } = useContext(AdminContext)

   if (isLoading) return <Loading/>

   if (isAuth === false) return children

   return <Navigate to='/Admin' />

}

export default observer(OnlyLogoutAdmin);