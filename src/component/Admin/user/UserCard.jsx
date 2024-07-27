import {
   Avatar,
   Box,
   Card,
   CardContent,
   CardMedia,
   Typography,
   useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { ADMIN_USER_ROUTE } from "../../../route/RouterConfig";

export const UserCard = ({ user }) => {
   const theme = useTheme();
   return (
      <NavLink to={ADMIN_USER_ROUTE+'/'+user?.id} >
         <Card
            sx={{
               display: "flex",
               background: theme.palette.secondary.light,
               borderRadius: "10px",
               p: 2,
               alignItems: "center",
               gap: 2,
               borderWidth: "1px",
               borderStyle: "solid",
               borderColor: theme.palette.background.light,
               cursor: "pointer",
               "&:hover": {
                  background: theme.palette.background.main,
               },
            }}
         >
            <CardMedia>
               <Avatar
                  sx={{ width: "70px", height: "70px" }}
                  alt="Remy Sharp"
                  src={user?.avatar?.path}
               />
            </CardMedia>
            <CardContent
               sx={{
                  p: "0px !important",
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
               }}
            >
               <Typography
                  variant="h6"
                  color={theme.palette.secondary.contrastText}
               >
                  @{user?.username}
               </Typography>
               <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                     <Typography
                        variant="body1"
                        color={theme.palette.secondary.main}
                     >
                        email:
                     </Typography>
                     <Typography
                        variant="body1"
                        color={theme.palette.secondary.contrastText}
                     >
                        {user?.email}
                     </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                     <Typography
                        variant="body1"
                        color={theme.palette.secondary.main}
                     >
                        name:
                     </Typography>
                     <Typography
                        variant="body1"
                        color={theme.palette.secondary.contrastText}
                     >
                        {user?.name}
                     </Typography>
                  </Box>
               </Box>
            </CardContent>
         </Card>
      </NavLink>
   );
};
