import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { grey } from "@mui/material/colors";
import LinkItem from "./LinkItem";

const drawerWidth = 240;

const openedMixin = (theme) => ({
   width: drawerWidth,
   [theme.breakpoints.down("sm")]: {
      width: "100%",
   },
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
   }),
   overflowX: "hidden",
});

const closedMixin = (theme) => ({
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   overflowX: "hidden",
   width: `0px`,
   [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(6)} + 1px)`,
   },
});

const AppBar = styled(MuiAppBar)(({ theme }) => ({
   [theme.breakpoints.up("sm")]: {
      zIndex: theme.zIndex.drawer + 1,
   },
   position: "relative", //imp
   background: theme.palette.background.main,
}));

const IconWrapper = styled(Box, {
   shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
   display: "flex",
   width: "48px",
   justifyContent: "center",
   [theme.breakpoints.up("sm")]: {
      transition: theme.transitions.create(["width"], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
         width: `${drawerWidth}px`,
         justifyContent: "end",
         transition: theme.transitions.create(["width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
         }),
      }),
   },
}));

export const CustomAppBar = ({ open, handleDrawerOpen, showButton }) => {
   return (
      <AppBar open={open}>
         <Toolbar disableGutters>
            {showButton && (
               <IconWrapper open={open}>
                  <IconButton
                     aria-label="Click"
                     color="inherit"
                     onClick={handleDrawerOpen}
                  >
                     {open ? (
                        <ChevronLeftIcon fontSize="large" />
                     ) : (
                        <MenuIcon />
                     )}
                  </IconButton>
               </IconWrapper>
            )}
            <Typography
               sx={{ pl: { xs: showButton ? 0 : 2, sm: 1 }, pr: 1 }}
               variant="h6"
               noWrap
               component="div"
            >
               Settings
            </Typography>
         </Toolbar>
      </AppBar>
   );
};

const Drawer = styled(MuiDrawer, {
   shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
   width: drawerWidth,
   flexShrink: 0,
   whiteSpace: "nowrap",
   position: "relative",
   boxSizing: "border-box",
   "& .MuiDrawer-paper": {
      width: drawerWidth,
      position: "absolute", //imp
      transition: "none !important",
   },
   "& .MuiDrawer-paperAnchorDockedLeft": {
      position: "absolute !important",
   },
   ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
   }),
   ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
   }),
}));

export const CustomDrawer = ({ open, links, selectedPath, click }) => {

   const theme = useTheme()

   const getScrollStyles =(data = {width: 4,borderWidth :2 }) => {
      const {width = 4,color = theme.palette.secondary.main,borderWidth = 2,borderColor = 'transparent' } = data
      return ({
         "&::-webkit-scrollbar": { width: `${width+borderWidth*2}px` },
         "&::-webkit-scrollbar-track": { borderRadius: '2px', },
         "&::-webkit-scrollbar-thumb": { bgcolor: color, borderRadius: '10px', border: `${borderWidth}px solid ${borderColor}` },
      })
   }
   const style = getScrollStyles();
   return (
      <Drawer
         variant={"permanent"}
         open={open}
         sx={{ "& .MuiDrawer-paperAnchorDockedLeft": {background:theme.palette.background.light,...style} }}
      >
         {links.map((array, i) => (
            <List key={i}>
               <Divider />
               {array.map((list) => (
                  <LinkItem
                     key={list.name}
                     list={list}
                     open={open}
                     selected={selectedPath}
                     click={click}
                  />
               ))}
            </List>
         ))}
      </Drawer>
   );
};
