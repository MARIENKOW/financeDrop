import { Outlet } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import Header from "../Account/Header/Header";

function AdminAccountWrapper() {
   const thema = useTheme();

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
