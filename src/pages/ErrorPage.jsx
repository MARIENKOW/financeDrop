import { useRouteError } from "react-router"
import { Navigate } from "react-router";
// import Header from "../components/Header/Header";
import { grey } from "@mui/material/colors";
import ErrorElement from "../component/general/ErrorElement";


const ErrorPage = () => {
   const error = useRouteError()
   
   if (error?.response?.status === 401) return <Navigate to='/login' />

   return (
      <div style={{ background: grey[800], minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

         {/* <Header /> */}
         <ErrorElement message={error?.message}/>
      </div>
   )
}

export default ErrorPage