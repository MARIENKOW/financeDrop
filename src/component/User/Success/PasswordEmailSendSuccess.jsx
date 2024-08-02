import { Box, Typography, Button, useTheme } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { REMEMBER_TOKEN_TIME } from "../../../validateConfig";
import { NavLink } from "react-router-dom";
import { USER_SIGN_IN_ROUTE } from "../../../route/RouterConfig";

const PasswordSuccess = ({ mail, size = "h6", button = true }) => {

   const theme = useTheme()

   return (
      <Box
         p={1}
         maxWidth={320}
         margin={"0 auto"}
         flex={1}
         gap={2}
         display={"flex"}
         flexDirection={"column"}
         justifyContent={"center"}
         alignItems={"center"}
      >
         <DoneAllIcon sx={{ width: 50, height: 50 }} color="primary" />
         <Typography color={"secondary.contrastText"} textAlign={"center"} variant={size}>
            A link to confirm the password change has been sent to the email
            {mail && mail !== true ? `: "${mail}"` : null}
         </Typography>
         <Box>
            <Typography
               textAlign={"center"}
               variant={"body1"}
               color={"secondary.main"}
            >
               The link will be active for {REMEMBER_TOKEN_TIME} minutes
            </Typography>
            <Typography
               textAlign={"center"}
               variant={"body1"}
               color={"secondary.main"}
            >
               Check your Spam folder
            </Typography>
         </Box>
         {button && (
            <NavLink to={USER_SIGN_IN_ROUTE}>
               <Button variant="contained">Sign In</Button>
            </NavLink>
         )}
      </Box>
   );
};

export default PasswordSuccess;
