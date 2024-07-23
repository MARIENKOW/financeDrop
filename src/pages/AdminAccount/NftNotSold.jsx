import InCenterAuth from "../../component/general/wrappers/InCenterAuth";
import { Title } from "../../component/general/Title";
import { Box, useTheme, Unstable_Grid2 as Grid } from "@mui/material";
import { useEffect, useState } from "react";
import NftService from "../../services/NftService";
import Loading from "../../component/general/Loading/Loading";
import ErrorElement from "../../component/general/ErrorElement";
import NftCard from "../../component/general/nft/NftCard";
import { NftCardAdmin } from "../../component/Admin/nft/NftCardAdmin";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

const NftNotSold = () => {
   const theme = useTheme();
   // const [error, setError] = useState(false);
   // const [loading, setLoading] = useState(true);
   // const [nftArray, setNftArray] = useState(true);

   const { error, isLoading, data, refetch } = useQuery({
      queryKey: ["getNotSoldAdmin"],
      queryFn: NftService.getNotSold,
      select: ({ data }) => data,
   });

   console.log(data);

   if (isLoading) return <Loading />;

   if (error) return <ErrorElement message={error?.message} />;

   if (data?.length === 0) return "empty...";

   const handleDelete = (setIsLoadingDelete) => {
      return async (id) => {
         try {
            const alertAnswer = window.confirm("realy nigga?");
            if (!alertAnswer) return;
            setIsLoadingDelete(true);
            console.log('deleteBefore');
            await NftService.delete(id);
            console.log('deleteAfter');
            await refetch({cancelRefetch:false});
            console.log('afterRefetch');
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
      <InCenterAuth
         style={{
            background: theme.palette.background.dark,
            p: { xs: 1, sm: 4 },
         }}
         maxWidth="lg"
      >
         <Title label={"NFT"} />
         <Grid container spacing={2} columns={12}>
            {data?.map((el) => (
               <Grid item xs={6} sm={4} md={4} lg={3} key={el?.id}>
                  <NftCardAdmin nft={el} deleteNft={handleDelete} />
               </Grid>
            ))}
         </Grid>
      </InCenterAuth>
   );
};

export default NftNotSold;
