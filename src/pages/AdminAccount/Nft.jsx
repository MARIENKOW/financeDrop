import InCenterAuth from "../../component/general/wrappers/InCenterAuth";
import { StyledTextField } from "../../component/general/Form/StyledTextField";
import { StyledLoadingButton } from "../../component/general/StyledLoadingButton";
import { useForm } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Title } from "../../component/general/Title";
import { StyledNumberField } from "../../component/general/Form/StyledNumberField";
import { Box, useTheme, Typography, Button, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import NftService from "../../services/NftService";
import { NftFullInfo } from "../../component/general/nft/NftFullInfo";
import { NavLink } from "react-router-dom";
import Loading from "../../component/general/Loading/Loading";
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

const Nft = () => {
   const theme = useTheme();

   const navigate = useNavigate();

   const { id } = useParams();

   const [isLoadingDelete, setIsLoadingDelete] = useState(false);

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

   const handleDelete = async () => {
      try {
         const alertAnswer = window.confirm("realy nigga?");
         if (!alertAnswer) return;
         setIsLoadingDelete(true);
         await NftService.delete(data.id);
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
                  <Button fullWidth color="warning" variant="outlined">
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
            {/* <Title label={"AbyssalLegends"} /> */}
            <NftFullInfo nft={data} />
         </InCenter>
      </ContainerComponent>
   );
};

export default Nft;
