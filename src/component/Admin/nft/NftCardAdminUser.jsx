import NftCard from "../../general/nft/NftCard";
import { NavLink } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { formatDate } from "../../../helper";

export const NftCardAdminUser = ({ nft, sx }) => {
   console.log(formatDate(nft?.date_end), nft?.date_end);

   const theme = useTheme();
   return (
      <NftCard
         nft={nft?.nft}
         sx={sx}
         cardAction={
            <Box sx={{ display: "flex", overflow: "hidden" }}>
               <Box display={"flex"} width={'100%'} sx={{ pl: 1, pr: 1, pb: 1 ,justifyContent:"space-between"}} gap={"2px"}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                     <Typography
                        fontWeight={600}
                        variant="body2"
                        color={theme.palette.secondary.main}
                     >
                        until:
                     </Typography>
                     <Typography
                        fontWeight={600}
                        variant="body2"
                        color={theme.palette.secondary.contrastText}
                     >
                        {formatDate(nft?.date_end)}
                     </Typography>
                  </Box>
                  <Typography
                     fontWeight={600}
                     variant="body2"
                     color={theme.palette.secondary.contrastText}
                  >
                     {nft?.nft?.percent} %
                  </Typography>
               </Box>
            </Box>
         }
      />
   );
};
