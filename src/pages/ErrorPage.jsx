import { useRouteError } from "react-router";
import { Navigate } from "react-router";
// import Header from "../components/Header/Header";
import { grey } from "@mui/material/colors";
import ErrorElement from "../component/general/ErrorElement";

const ErrorPage = () => {
   const error = useRouteError();

   return (
      <div
         style={{
            // background: grey[800],
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            flex: 1,
         }}
      >
         {/* <Header /> */}
         <ErrorElement message={error?.message} />
      </div>
   );
};

export default ErrorPage;
