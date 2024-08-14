import { Box, useTheme, Typography, LinearProgress } from "@mui/material";
import { formatDate } from "../../../helper";
// import PaymentIcon from "@mui/icons-material/Payment";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDown from "@mui/icons-material/KeyboardDoubleArrowDown";
import config from "../../../config";

export const UserCashOutPendingItem = ({ item }) => {
   const theme = useTheme();

   return (
      <Box
         sx={{
            overflow: "hidden",
            borderRadius: "10px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme.palette.secondary.light,
            background: theme.palette.secondary.dark,
         }}
      >
         <LinearProgress
            sx={{ height: "1px" }}
            color="primary"
            variant="query"
         />
         <Box
            sx={{
               p: 1,
               display:'flex',
               flexDirection:'column',
               gap:1
            }}
         >
            <Box
               sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
               }}
            >
               <Box display={"flex"} gap={1} alignItems={"center"}>
                  <Typography
                     fontWeight={"600"}
                     variant="body2"
                     color={theme.palette.secondary.main}
                  >
                     {"deposit:"}
                  </Typography>
                  <Typography
                     fontWeight={"600"}
                     variant="body2"
                     color={theme.palette.secondary.contrastText}
                  >
                     {config.depositTypes[item?.deposit_type]}
                  </Typography>
               </Box>
               <Typography
                  variant="body2"
                  fontWeight={600}
                  color={theme.palette.secondary.contrastText}
               >
                  - $ {item?.sum}
               </Typography>
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
               <Typography
                  fontWeight={"600"}
                  variant="body2"
                  sx={{whiteSpace:'nowrap'}}
                  color={theme.palette.secondary.main}
               >
                  {"address Matic:"}
               </Typography>
               <Typography
                  fontWeight={"600"}
                  variant="body2"
                  sx={{
                     whiteSpace: "nowrap",
                     textOverflow: "ellipsis",
                     overflow: "hidden",
                  }}
                  color={theme.palette.secondary.contrastText}
               >
                  {item?.addressMatic}
               </Typography>
            </Box>
         </Box>
         <LinearProgress sx={{ height: "1px" }} color="primary" />
      </Box>
   );
};
