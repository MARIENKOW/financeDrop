import { Context } from "../../../../User";
import { Button } from "@mui/material";
import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { ContainerComponent } from "../../../general/wrappers/ContainerComponent";
import LogoutIcon from "@mui/icons-material/Logout";
import { StyledLink } from "../../../general/BreadcrumbsComponent";
import { NavLink } from "react-router-dom";
import { USER_NFT_ROUTE, USER_ROUTE, USER_SETTINGS_ROUTE } from "../../../../route/RouterConfig";
import Home from "@mui/icons-material/Home";

const Header = () => {
   const { logOut } = useContext(Context);

   return (
      <Box mb={2}>
         <AppBar color="background" position="static">
            <ContainerComponent sx={{ p: { xs: 0 } }}>
               <Toolbar
                  sx={{
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                     gap: 3,
                  }}
               >
                  <Box display={"flex"} gap={3} alignItems="center">
                     <NavLink to={USER_ROUTE}>
                        <StyledLink>
                           <Home sx={{ mr: 0.5 }} fontSize="small" />
                           Main
                        </StyledLink>
                     </NavLink>
                     <NavLink to={USER_NFT_ROUTE}>
                        <StyledLink>NFT</StyledLink>
                     </NavLink>
                     <NavLink to={USER_SETTINGS_ROUTE}>
                        <StyledLink>Settings</StyledLink>
                     </NavLink>
                  </Box>
                  <Button startIcon={<LogoutIcon />} onClick={logOut}>
                     Logout
                  </Button>
               </Toolbar>
            </ContainerComponent>
         </AppBar>
      </Box>
   );
};

export default Header;
