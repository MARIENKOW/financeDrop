import { Title } from "../../component/general/Title";
import { Box, Unstable_Grid2 as Grid, Button } from "@mui/material";
import NftService from "../../services/NftService";
import ErrorElement from "../../component/general/ErrorElement";
import { NftCardAdmin } from "../../component/Admin/nft/NftCardAdmin";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { ContainerComponent } from "../../component/general/wrappers/ContainerComponent";
import InCenter from "../../component/general/wrappers/InCenter";
import { NavLink } from "react-router-dom";
import { ADMIN_NFT_ADD_ROUTE } from "../../route/RouterConfig";
import { Empty } from "../../component/general/Empty";
import NftCard_skeleton from "../../component/general/skeletons/NftCard_skeleton";
import AddIcon from "@mui/icons-material/Add";
import { $AdminApi } from "../../http";

export const Admin_Nft_NotSold = () => {

   const nftServiceAdmin = new NftService($AdminApi)

   const { error, isLoading, data, refetch } = useQuery({
      queryKey: ["getNotSoldAdmin"],
      queryFn: nftServiceAdmin.getNftNotSold,
      select: ({ data }) => data,
   });

   if (error) return <ErrorElement admin={true} message={error?.message} />;

   const handleDelete = (setIsLoadingDelete) => {
      return async (id) => {
         try {
            const alertAnswer = window.confirm("realy nigga?");
            if (!alertAnswer) return;
            setIsLoadingDelete(true);
            await nftServiceAdmin.deleteNft(id);
            await refetch({ cancelRefetch: false });
            enqueueSnackbar(`NFT successfully deleted`, { variant: "success" });
         } catch (error) {
            enqueueSnackbar(`"Oops! something went wrong, try again later"`, {
               variant: "error",
            });
         } finally {
            setIsLoadingDelete(false);
         }
      };
   };

   return (
      <ContainerComponent>
         <Title label={"NFT"} />
         <Box
            display={{ xs: "block", sm: "flex" }}
            mb={2}
            justifyContent={{ sm: "normal", sm: "end" }}
         >
            <NavLink to={ADMIN_NFT_ADD_ROUTE}>
               <Button
                  startIcon={<AddIcon />}
                  sx={{fontWeight:600}}
                  size="large"
                  fullWidth
                  color="primary"
                  variant="outlined"
               >
                  add new NFT
               </Button>
            </NavLink>
         </Box>
         <InCenter style={{ p: { xs: 0 } }} maxWidth="lg">
            {isLoading ? (
               <Grid container spacing={1} columns={12}>
                  {Array(4)
                     .fill("5")
                     .map((el, id) => (
                        <Grid xs={6} sm={4} md={4} lg={3} key={id}>
                           <NftCard_skeleton />
                        </Grid>
                     ))}
               </Grid>
            ) : data?.length !== 0 ? (
               <Grid container spacing={1} columns={12}>
                  {data?.map((el) => (
                     <Grid xs={6} sm={4} md={4} lg={3} key={el?.id}>
                        <NftCardAdmin nft={el} deleteNft={handleDelete} />
                     </Grid>
                  ))}
               </Grid>
            ) : (
               <Empty />
            )}
         </InCenter>
      </ContainerComponent>
   );
};
