import {
  Typography,
  Button,
  ButtonGroup,
  Container,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import BungalowIcon from "@mui/icons-material/Bungalow";
import ReplyIcon from "@mui/icons-material/Reply";
import { useRouteError } from "react-router-dom";
import { ADMIN_ROUTE, USER_ROUTE } from "../../route/RouterConfig";

const ErrorElement = ({ message ,admin}) => {
  const thema = useTheme();

  const error = useRouteError();

  return (
    <Container
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
        alignItems: "center",
        textAlign: "center",
      }}
      gap={2}
    >
      <Typography color={"secondary"} variant={"h1"}>
        Oops!
      </Typography>
      <Typography color={"secondary"} variant={"h4"}>
        Something went wrong
      </Typography>
      <Typography variant={"body1"} color="secondary.light">
        {error?.message || message}
      </Typography>
      <ButtonGroup sx={{ gap: 1 }} size="large">
        <NavLink to={-1}>
          <Button startIcon={<ReplyIcon />} variant="contained">
            back
          </Button>
        </NavLink>
        <NavLink to={admin?ADMIN_ROUTE:USER_ROUTE}>
          <Button endIcon={<BungalowIcon />} variant="contained">
            home
          </Button>
        </NavLink>
      </ButtonGroup>
    </Container>
  );
};

export default ErrorElement;
