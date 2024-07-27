import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { NavLink } from "react-router-dom";
import { styled, useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { ADMIN_ROUTE, USER_ROUTE } from "../../route/RouterConfig";

export const StyledLink = styled(Typography)(({ theme }) => ({
   ...theme,
   color: theme.palette.secondary.main,
   display: "flex",
   alignItems: "center",
   fontWeight: 600,
   "&:hover": {
      color: theme.palette.secondary.contrastText,
   },
}));

export default function BreadcrumbsComponent({ main, options, admin }) {
   const theme = useTheme();
   return (
      <Breadcrumbs
         maxItems={3}
         separator={<NavigateNextIcon color="secondary" fontSize="small" />}
         aria-label="breadcrumb"
      >
         {main && (
            <NavLink to={admin ? ADMIN_ROUTE : USER_ROUTE}>
               <StyledLink>
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                  Main
               </StyledLink>
            </NavLink>
         )}
         {options?.map((e, i, arr) =>
            i !== arr.length - 1 ? (
               <NavLink to={e?.link} key={new Date()}>
                  <StyledLink>
                     {e?.icon}
                     {e?.name}
                  </StyledLink>
               </NavLink>
            ) : (
               <Typography
                  key={new Date()}
                  color={theme.palette.secondary.contrastText}
               >
                  {e?.name}
               </Typography>
            )
         )}
      </Breadcrumbs>
   );
}
