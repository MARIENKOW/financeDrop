import nftService from "../../services/NftService";
import { useNavigate, useParams } from "react-router";
import { NftForm } from "../../component/Admin/nft/NftForm";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../component/general/Loading/Loading";
import ErrorElement from "../../component/general/ErrorElement";
import { Title } from "../../component/general/Title";
import InCenterAuth from "../../component/general/wrappers/InCenterAuth";
import { Box, useTheme } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { ADMIN_NFT_ROUTE } from "../../route/RouterConfig";
import { ContainerComponent } from "../../component/general/wrappers/ContainerComponent";
import BreadcrumbsComponent from "../../component/general/BreadcrumbsComponent";
import InCenter from "../../component/general/wrappers/InCenter";
import { NftFullInfo_skeleton } from "../../component/general/skeletons/NftFullInfo_skeleton";

const NftEdit = () => {
   const navigate = useNavigate();

   const { id } = useParams();

   const theme = useTheme();

   const { data, isLoading, error } = useQuery({
      queryKey: ["nftEdit"],
      queryFn: () => nftService.getById(id),
      select: ({ data }) => data,
   });

   if (isLoading) return <Box mt={6}><NftFullInfo_skeleton/></Box>;

   if (error) return <ErrorElement admin={true} message={error?.message} />;

   if (!data) return <ErrorElement admin={true} message={error?.message} />;

   const onSubmit = (setError, dirtyFields) => {
      return async (value) => {
         try {
            const formData = new FormData();
            for (let key in value) {
               if (!dirtyFields[key]) continue;
               formData.append(key, value[key]);
            }
            const { data: user_id } = await nftService.update(
               data.id,
               formData
            );
            enqueueSnackbar(`NFT successfully changed`, { variant: "success" });
            navigate(ADMIN_NFT_ROUTE + "/" + user_id);
         } catch (error) {
            console.log(error);
            setError("root.server", {
               type: "server",
               message: "Oops! something went wrong, try again later",
            });
         }
      };
   };

   return (
      <ContainerComponent>
         <Title label={"Edit NFT"} />

         <Box mb={5}>
            <BreadcrumbsComponent
               admin={true}
               options={[
                  { name: "NFT", link: ADMIN_NFT_ROUTE },
                  { name: data?.name, link: ADMIN_NFT_ROUTE + "/" + data?.id },
                  { name: "Edit NFT" },
               ]}
            />
         </Box>
         <InCenter
            style={{
               p: { xs: 0 },
            }}
            maxWidth="md"
         >
            <NftForm nft={data} submit={onSubmit} />;
         </InCenter>
      </ContainerComponent>
   );
};

export default NftEdit;
