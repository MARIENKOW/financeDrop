import { useTheme } from "@emotion/react";
import {
   Avatar,
   Box,
   Button,
   Card,
   CardContent,
   CardMedia,
   Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { USER_SETTINGS_ADDRESS_MATTIC_ROUTE } from "../../../route/RouterConfig";

export const UserFullInfoAdmin = ({ user, sx, userMode = true }) => {
   const theme = useTheme();
   return (
      <Card
         elevation={0}
         sx={{
            display: "flex",
            background: "transparent",
            borderRadius: "10px",
            gap: { xs: 4, md: 2 },
            flexDirection: "row",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "normal", md: "center" },
            ...sx,
         }}
      >
         <CardMedia
            sx={{
               display: "flex",
               alignItems: "center",
               gap: 2,
               pl: 2,
               pr: 2,
               flexDirection: "column",
            }}
         >
            <Avatar
               sx={{ width: "70px", height: "70px" }}
               alt="Remy Sharp"
               src={user?.img?.path}
            />
            <Typography
               variant="body1"
               color={theme.palette.secondary.contrastText}
            >
               @{user?.username}
            </Typography>
         </CardMedia>
         <CardContent
            sx={{
               p: "0px !important",
               display: "flex",
               flexDirection: "column",
               gap: "3px",
               flex: 1,

               //!----------------------------------
               background: theme.palette.secondary.light,
               borderRadius: "10px",
               p: "16px !important",
               justifyContent: "center",
               gap: 1,
               // flexDirection: "row",
               borderWidth: "1px",
               borderStyle: "solid",
               borderColor: theme.palette.background.light,
               //!----------------------------------
            }}
         >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
               <Typography variant="body1" color={theme.palette.secondary.main}>
                  name:
               </Typography>
               <Typography
                  variant="body1"
                  color={theme.palette.secondary.contrastText}
               >
                  {user?.name}
               </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
               <Typography variant="body1" color={theme.palette.secondary.main}>
                  email:
               </Typography>
               <Typography
                  variant="body1"
                  color={theme.palette.secondary.contrastText}
               >
                  {user?.email}
               </Typography>
            </Box>
            <Box sx={{ display: "flex",flexWrap:'wrap',  alignItems: "center", gap: 1 }}>
               <Typography variant="body1" sx={{whiteSpace:'nowrap'}} color={theme.palette.secondary.main}>
                  address Matic:
               </Typography>
               <Typography
                  variant="body1"
                  color={theme.palette.secondary.contrastText}
               >
                  {user?.addressMatic ||
                     (userMode ? (
                        <NavLink to={USER_SETTINGS_ADDRESS_MATTIC_ROUTE}>
                           <Button>add address</Button>
                        </NavLink>
                     ) : (
                        ""
                     ))}
               </Typography>
            </Box>

            {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
               <Typography variant="body1" color={theme.palette.secondary.main}>
                  uuid:
               </Typography>
               <Typography
                  variant="body1"
                  color={theme.palette.secondary.contrastText}
               >
                  {user?.uuid}
               </Typography>
            </Box> */}
         </CardContent>
      </Card>
   );
};

// import { useTheme } from "@emotion/react";
// import {
//    Avatar,
//    Box,
//    Card,
//    CardContent,
//    CardMedia,
//    Typography,
// } from "@mui/material";

// export const UserFullInfoAdmin = ({ user,sx }) => {
//    const theme = useTheme();
//    return (
//       <Card
//          sx={{
//             display: "flex",
//             background: theme.palette.secondary.light,
//             borderRadius: "10px",
//             p: 2,
//             alignItems: "center",
//             gap: 2,
//             flexDirection: "row",
//             borderWidth: "1px",
//             borderStyle: "solid",
//             borderColor: theme.palette.background.light,
//             ...sx
//          }}
//       >
//          <CardMedia
//             sx={{
//                display: "flex",
//                alignItems: "center",
//                gap: 1,
//                flexDirection: "column",
//                // justifyContent: "center",
//             }}
//          >
//             <Avatar
//                sx={{ width: "50px", height: "50px" }}
//                alt="Remy Sharp"
//                src={user?.avatar?.path}
//             />
//             <Typography
//                variant="body1"
//                color={theme.palette.secondary.contrastText}
//             >
//                @{user?.username}
//             </Typography>
//          </CardMedia>
//          <CardContent
//             sx={{
//                p: "0px !important",
//                display: "flex",
//                flexDirection: "column",
//                gap:'3px'
//             }}
//          >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                <Typography variant="body1" color={theme.palette.secondary.main}>
//                   email:
//                </Typography>
//                <Typography
//                   variant="body1"
//                   color={theme.palette.secondary.contrastText}
//                >
//                   {user?.email}
//                </Typography>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                <Typography variant="body1" color={theme.palette.secondary.main}>
//                   name:
//                </Typography>
//                <Typography
//                   variant="body1"
//                   color={theme.palette.secondary.contrastText}
//                >
//                   {user?.name}
//                </Typography>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                <Typography variant="body1" color={theme.palette.secondary.main}>
//                   uuid:
//                </Typography>
//                <Typography
//                   variant="body1"
//                   color={theme.palette.secondary.contrastText}
//                >
//                   {user?.uuid}
//                </Typography>
//             </Box>
//          </CardContent>
//       </Card>
//    );
// };
