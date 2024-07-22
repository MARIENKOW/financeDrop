import { Outlet } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import Header from "../Account/Header/Header";
import { useEffect } from "react";

function AdminAccountWrapper() {
   const thema = useTheme();

   useEffect(() => {
      function wheel (event) {
         if (document.activeElement.type === "number") {
            document.activeElement.blur();
         }
      }
      document.addEventListener("wheel",wheel );
      return document.removeEventListener('wheel',wheel)
   }, []);
   
   return (
      <div
         style={{
            background: thema.palette.background.dark,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            flex: 1,
         }}
      >
         <Header />
         <Box
            sx={{
               flex: "1",
               position: "relative",
               display: "flex",
               flexDirection: "column",
            }}
         >
            <Outlet />
         </Box>
      </div>
   );
}

export default AdminAccountWrapper;
