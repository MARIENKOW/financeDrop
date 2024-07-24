import { Box, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { USER_SIGN_IN_ROUTE } from "../../../route/RouterConfig";

const PasswordWasChanged = () => {
   return (
      <Box
         gap={2}
         flex={1}
         display={"flex"}
         flexDirection={"column"}
         alignItems={"center"}
         justifyContent={"center"}
      >
         <DoneAllIcon sx={{ width: 70, height: 70 }} color="primary" />

         <Typography
            color={"secondary"}
            sx={{ mb: 1 }}
            variant="h5"
            component="h2"
         >
            The password has been changed
         </Typography>
         <NavLink to={USER_SIGN_IN_ROUTE}>
            <Button variant="contained">Sign In</Button>
         </NavLink>
      </Box>
   );
};

export default PasswordWasChanged;
