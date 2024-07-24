import DoneAllIcon from "@mui/icons-material/DoneAll";
import { NavLink } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { USER_SIGN_IN_ROUTE } from "../../../route/RouterConfig";

const AccountActivateSuccess = () => {
  return (
    <Box
      p={1}
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
        The email has been confirmed
      </Typography>
      <NavLink to={USER_SIGN_IN_ROUTE}>
        <Button variant="contained">Sign In</Button>
      </NavLink>
    </Box>
  );
};

export default AccountActivateSuccess;
