import { Box, useTheme, Typography } from "@mui/material";
import { formatDate } from "../../../helper";
// import PaymentIcon from "@mui/icons-material/Payment";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDown from "@mui/icons-material/KeyboardDoubleArrowDown";

export const DepositItem = ({ depositUp }) => {
   const theme = useTheme();

   return (
      <Box
         sx={{
            borderRadius: "10px",
            p: 1,
            borderWidth: "1px",
            borderStyle: "solid",
            // borderColor: theme.palette.background.light,
            borderColor: depositUp?.increment
               ? theme.palette.success.light
               : theme.palette.background.light,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // background: theme.palette.secondary.light,
            background: depositUp?.increment
               ? theme.palette.success.dark
               : theme.palette.secondary.light,
         }}
      >
         <Box display={"flex"} alignItems={"center"}>
            {depositUp?.increment ? (
               <KeyboardDoubleArrowUpIcon
                  htmlColor={theme.palette.success.main}
                  fontSize="large"
                  sx={{ mr: 1 }}
               />
            ) : (
               <KeyboardDoubleArrowDown
                  htmlColor={theme.palette.secondary.main}
                  fontSize="large"
                  sx={{ mr: 1 }}
               />
            )}
            <Typography
               fontWeight={"600"}
               variant="body2"
               color={
                  // theme.palette.secondary.contrastText
                  depositUp?.increment
                     ? theme.palette.success.contrastText
                     : theme.palette.secondary.contrastText
               }
            >
               {depositUp?.nft_name || depositUp?.name}
            </Typography>
         </Box>
         <Typography
            variant="body2"
            fontWeight={600}
            color={
               // depositUp?.increment
               //    ? theme.palette.success.main
               //    : theme.palette.secondary.contrastText
               depositUp?.increment
                  ? theme.palette.success.contrastText
                  : theme.palette.secondary.contrastText
            }
         >
            {depositUp?.increment ? "+" : "-"} $ {depositUp?.sum}
         </Typography>
      </Box>
   );
};
