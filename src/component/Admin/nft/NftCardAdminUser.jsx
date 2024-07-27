import NftCard from "../../general/nft/NftCard";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";


export const NftCardAdminUser = ({ nft,sx }) => {



   return (
      <NftCard
         nft={nft?.nft}
         sx={sx}
         cardAction={
            <Box sx={{ display: "flex", overflow: "hidden" }}>
               {nft?.date_end}
            </Box>
         }
      />
   );
};
