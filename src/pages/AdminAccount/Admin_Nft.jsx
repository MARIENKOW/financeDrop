import { Box, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import NftService from "../../services/NftService";
import { NftFullInfo } from "../../component/general/nft/NftFullInfo";
import { NavLink } from "react-router-dom";
import ErrorElement from "../../component/general/ErrorElement";
import { enqueueSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import BreadcrumbsComponent from "../../component/general/BreadcrumbsComponent";
import {
   ADMIN_NFT_EDIT_ROUTE,
   ADMIN_NFT_ROUTE,
} from "../../route/RouterConfig";
import { ContainerComponent } from "../../component/general/wrappers/ContainerComponent";
import InCenter from "../../component/general/wrappers/InCenter";
import { NftFullInfo_skeleton } from "../../component/general/skeletons/NftFullInfo_skeleton";
import { $AdminApi } from "../../http";

export const Admin_Nft = () => {

   const nftServiceAdmin = new NftService($AdminApi)

   const navigate = useNavigate();

   const { id } = useParams();

   const [isLoadingDelete, setIsLoadingDelete] = useState(false);

   const { error, data, isLoading } = useQuery({
      queryKey: ["NFT",id],
      queryFn: async () => nftServiceAdmin.getNftById(id),
      select: ({ data }) => data,
   });

   if (isLoading)
      return (
         <Box mt={6}>
            <NftFullInfo_skeleton />
         </Box>
      );

   if (error) return <ErrorElement admin={true} message={error?.message} />;

   if (!data) return <ErrorElement admin={true} message={error?.message} />;

   const handleDelete = async () => {
      try {
         const alertAnswer = window.confirm("realy nigga?");
         if (!alertAnswer) return;
         setIsLoadingDelete(true);
         await nftServiceAdmin.deleteNft(data.id);
         enqueueSnackbar(`NFT successfully deleted`, { variant: "success" });
         navigate(ADMIN_NFT_ROUTE);
      } catch (error) {
         enqueueSnackbar(`"Oops! something went wrong, try again later"`, {
            variant: "error",
         });
      } finally {
         setIsLoadingDelete(false);
      }
   };

   return (
      <ContainerComponent>
         <Box
            display={"flex"}
            flexDirection={{ sm: "row", xs: "column" }}
            alignItems={{ sm: "center", xs: "normal" }}
            justifyContent={"space-between"}
            mb={{ xs: 0, sm: 3 }}
         >
            <Box mb={{ xs: 3, sm: 0 }}>
               <BreadcrumbsComponent
                  admin={true}
                  options={[
                     { name: "NFT", link: ADMIN_NFT_ROUTE },
                     { name: data?.name },
                  ]}
               />
            </Box>
            <Box
               sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { sm: "row", xs: "column" },
                  mt: 2,
                  mb: 2,
               }}
            >
               <NavLink
                  to={ADMIN_NFT_EDIT_ROUTE + "/" + id}
                  style={{ flex: "50% 0 1" }}
               >
                  <Button  fullWidth color="warning" variant="outlined">
                     edit
                  </Button>
               </NavLink>
               <LoadingButton
                  loading={isLoadingDelete}
                  onClick={handleDelete}
                  sx={{ flex: "50% 0 1" }}
                  color="error"
                  variant="contained"
               >
                  delete
               </LoadingButton>
            </Box>
         </Box>

         <InCenter
            style={{
               p: { xs: 0 },
            }}
            maxWidth="md"
         >
            <NftFullInfo nft={data} />
         </InCenter>
      </ContainerComponent>
   );
};
