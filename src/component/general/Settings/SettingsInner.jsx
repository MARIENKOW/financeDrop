import * as React from "react";
import Box from "@mui/material/Box";
import { Outlet, useLocation } from "react-router";
import { CustomDrawer, CustomAppBar } from "./Navigation";
import { useTheme } from "@mui/material";

export default function SettingsInner({ links }) {
   const theme = useTheme();

   const { pathname } = useLocation();
   const [mobile, setMobile] = React.useState(window.innerWidth < 600);
   const [selectedPath, setSelectedPath] = React.useState(
      mobile ? pathname.split("/")[2] : pathname.split("/")[2] || ""
   );
   const [open, setOpen] = React.useState(
      mobile
         ? !selectedPath
         : localStorage.getItem("isDrawerOpen")
         ? JSON.parse(localStorage.getItem("isDrawerOpen"))
         : true
   );

   React.useEffect(() => {
      const checkWidth = (e) => {
         if (window.innerWidth >= 600) return setMobile(false);
         setMobile(true);
      };
      window.addEventListener("resize", checkWidth);
      return () => window.removeEventListener("resize", checkWidth);
   }, []);

   React.useEffect(() => {
      if (mobile) return;
      localStorage.setItem("isDrawerOpen", open);
   }, [open]);

   const handleDrawerOpen = () => {
      setOpen((o) => !o);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleClick = (link) => {
      setSelectedPath(link);
      if (mobile) handleClose();
   };

   return (
      <Box
         overflow={"hidden"}
         sx={{ bgcolor: theme.palette.background.main }}
         flex={1}
         display={"flex"}
         flexDirection={"column"}
         position={"relative"}
      >
         <CustomAppBar
            open={open}
            showButton={typeof selectedPath !== "undefined"}
            handleDrawerOpen={handleDrawerOpen}
         />
         <Box flex={1} display={"flex"}>
            <CustomDrawer
               open={open}
               links={links}
               selectedPath={selectedPath}
               click={handleClick}
            />
            <Box
               sx={{
                  display: { xs: open ? "none" : "flex", sm: "flex" },
                  bgcolor: theme.palette.background.main,
                  p: 3,
               }}
               flex={1}
            >
               <Outlet style={{ flex: 1 }}></Outlet>
            </Box>
         </Box>
      </Box>
   );
}
