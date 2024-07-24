import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import NftService from "../../services/NftService";
import { NftFullInfo } from "../../component/general/nft/NftFullInfo";
import ErrorElement from "../../component/general/ErrorElement";
import BreadcrumbsComponent from "../../component/general/BreadcrumbsComponent";
import { USER_NFT_ROUTE } from "../../route/RouterConfig";
import { ContainerComponent } from "../../component/general/wrappers/ContainerComponent";
import InCenter from "../../component/general/wrappers/InCenter";
import { NftFullInfo_skeleton } from "../../component/general/skeletons/NftFullInfo_skeleton";

export const User_Nft = () => {
   const { id } = useParams();

   const { error, data, isLoading } = useQuery({
      queryKey: ["nftArray"],
      queryFn: async () => NftService.getById(id),
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

   return (
      <ContainerComponent>
         <Box mb={5} >
            <BreadcrumbsComponent
               admin={true}
               options={[
                  { name: "NFT", link: USER_NFT_ROUTE },
                  { name: data?.name },
               ]}
            />
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
