import { Title } from "../../../component/general/Title";
import {  Unstable_Grid2 as Grid, Button } from "@mui/material";
import ErrorElement from "../../../component/general/ErrorElement";
import { useQuery } from "@tanstack/react-query";
import { ContainerComponent } from "../../../component/general/wrappers/ContainerComponent";
import InCenter from "../../../component/general/wrappers/InCenter";
import { Empty } from "../../../component/general/Empty";
import NftCard_skeleton from "../../../component/general/skeletons/NftCard_skeleton";
import { NftCardUser } from "../../../component/User/nft/NftCardUser";
import NftService from "../../../services/NftService";
import { $UserApi } from "../../../http";

export const User_Nft_NotSold = () => {

   console.log(NftService);

   const nftServiceUser = new NftService($UserApi)

   console.log(nftServiceUser);

   const { error, isLoading, data } = useQuery({
      queryKey: ["getNotSoldUser"],
      queryFn: nftServiceUser.getNftNotSold,
      select: ({ data }) => data,
   });

   if (error) return <ErrorElement message={error?.message} />;

   console.log(isLoading);

   return (
      <ContainerComponent >
         <Title label={"NFT"} />
         {/* <Box
            display={{ xs: "block", sm: "flex" }}
            mb={2}
            justifyContent={{ sm: "normal", sm: "end" }}
         ></Box> */}
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
                        <NftCardUser nft={el} />
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
