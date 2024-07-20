import { Outlet } from "react-router-dom";
import Header from "../Account/Header/Header";
import { Box, useTheme } from "@mui/material";

function UserAccountWrapper() {
   const thema = useTheme();

   return (
      <Box
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
      </Box>
   );
}

export default UserAccountWrapper;
