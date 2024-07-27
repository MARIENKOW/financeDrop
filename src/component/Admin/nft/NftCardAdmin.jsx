import NftCard from "../../general/nft/NftCard";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { ADMIN_NFT_ROUTE } from "../../../route/RouterConfig";


export const NftCardAdmin = ({ nft, deleteNft }) => {


   const [isLoading,setIsLoading] = useState(false)

   const handleDelete = deleteNft(setIsLoading)

   return (
      <NftCard
         nft={nft}
         cardAction={
            <Box sx={{ display: "flex", overflow: "hidden" }}>
               <NavLink style={{ flex: "50% 0 1" }} to={ADMIN_NFT_ROUTE+'/'+ nft.id}>
                  <Button
                     variant="outlined"
                     color="primary"
                     fullWidth
                  // size="medium"

                     // size="small"
                     sx={{ borderRadius: "0px 0px 0px 10px",fontWeight:600 }}
                  >
                     open
                  </Button>
               </NavLink>
               <LoadingButton
                  variant="contained"
                  color="error"
                  loading={isLoading}
                  fullWidth
                  // size="large"
                  sx={{ borderRadius: "0px", flex: "50% 0 1" ,fontWeight:600}}
                  onClick={() => {
                     handleDelete(nft.id);
                  }}
               >
                  delete
               </LoadingButton>
            </Box>
         }
      />
   );
};
