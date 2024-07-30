import { Box, useTheme, Typography } from "@mui/material";
import { formatDate } from "../../../helper";

export const DepositItem = ({ depositUp }) => {
   const theme = useTheme();

   return (
      <Box
         sx={{
            borderRadius: "10px",
            p: 1,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme.palette.background.light,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: theme.palette.secondary.light,
         }}
      >
         <Typography variant="body2" color="secondary">
            {depositUp?.nft_name || depositUp?.name}:
         </Typography>
         {/* <Typography variant="body2" color="secondary">
            {formatDate(depositUp?.date)}
         </Typography> */}
         <Typography
            variant="body2"
            color={theme.palette.secondary.contrastText}
         >
            $ {depositUp?.sum}
         </Typography>
      </Box>
   );
};
