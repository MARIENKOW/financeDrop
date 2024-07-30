import { NftForm } from "../../../component/Admin/nft/NftForm";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { Title } from "../../../component/general/Title";
import { Box } from "@mui/material";
import { ADMIN_NFT_ROUTE } from "../../../route/RouterConfig";
import { ContainerComponent } from "../../../component/general/wrappers/ContainerComponent";
import BreadcrumbsComponent from "../../../component/general/BreadcrumbsComponent";
import InCenter from "../../../component/general/wrappers/InCenter";
import NftService from "../../../services/NftService";
import { $AdminApi } from "../../../http";

export const Admin_Nft_Add = () => {

   const nftServiceAdmin = new NftService($AdminApi)

   const navigate = useNavigate();

   const onSubmit = (setError) => {
      return async (data) => {
         try {
            const formData = new FormData();
            for (let key in data) {
               formData.append(key, data[key]);
            }
            const { data: id } = await nftServiceAdmin.createNft(formData);
            enqueueSnackbar(`NFT successfully added`, { variant: "success" });
            navigate(ADMIN_NFT_ROUTE + "/" + id);
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
         <Title label={"Add new NFT"} />

         <Box mb={5}>
            <BreadcrumbsComponent
               admin={true}
               options={[
                  { name: "NFT", link: ADMIN_NFT_ROUTE },
                  { name: "Add new NFT" },
               ]}
            />
         </Box>
         <InCenter
            style={{
               p: 0,
            }}
            maxWidth="md"
         >
            <NftForm submit={onSubmit} />;
         </InCenter>
      </ContainerComponent>
   );
};
