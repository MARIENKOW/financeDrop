import { useTheme } from "@emotion/react";
import {
   Avatar,
   Box,
   Card,
   CardContent,
   CardMedia,
   Typography,
} from "@mui/material";

export const UserFullInfoAdmin = ({ user }) => {
   const theme = useTheme();
   return (
      <Card
         sx={{
            display: "flex",
            background: theme.palette.secondary.light,
            borderRadius: "10px",
            p: 2,
            alignItems: "center",
            gap: 2,
            flexDirection: "row",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme.palette.background.light,
         }}
      >
         <CardMedia
            sx={{
               display: "flex",
               alignItems: "center",
               gap: 1,
               flexDirection: "column",
               // justifyContent: "center",
            }}
         >
            <Avatar
               sx={{ width: "50px", height: "50px" }}
               alt="Remy Sharp"
               src={user?.avatar?.path}
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
               gap:'3px'
            }}
         >
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
                  uuid:
               </Typography>
               <Typography
                  variant="body1"
                  color={theme.palette.secondary.contrastText}
               >
                  {user?.uuid}
               </Typography>
            </Box>
         </CardContent>
      </Card>
   );
};
