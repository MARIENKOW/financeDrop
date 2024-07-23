import InCenterAuth from "../../component/general/wrappers/InCenterAuth";
import { StyledTextField } from "../../component/general/Form/StyledTextField";
import { StyledLoadingButton } from "../../component/general/StyledLoadingButton";
import { useForm } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Title } from "../../component/general/Title";
import { StyledNumberField } from "../../component/general/Form/StyledNumberField";
import { Box, useTheme, Typography, Button } from "@mui/material";
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

const NftAdd = () => {
   const theme = useTheme();

   const navigate = useNavigate();

   const { id } = useParams();

   const [isLoadingDelete, setIsLoadingDelete] = useState(false);

   const { error, data, isLoading } = useQuery({
      queryKey: ["nftArray"],
      queryFn: async () => NftService.getById(id),
      select: ({ data }) => data,
   });

   if (isLoading) return <Loading />;

   if (error) return <ErrorElement message={error?.message} />;

   if (data?.length === 0) return "empty...";

   const handleDelete = async () => {
      try {
         const alertAnswer = window.confirm("realy nigga?");
         if (!alertAnswer) return;
         setIsLoadingDelete(true);
         await NftService.delete(data.id);
         enqueueSnackbar(`NFT successfully deleted`, { variant: "success" });
         navigate("/Admin/nft/notsold");
      } catch (error) {
         enqueueSnackbar(`"Oops! something went wrong, try again later"`, {
            variant: "error",
         });
      } finally {
         setIsLoadingDelete(false);
      }
   };

   return (
      <InCenterAuth
         style={{
            background: theme.palette.background.dark,
            p: { xs: 1, sm: 4 },
         }}
         maxWidth="md"
      >
         {/* <Title label={"AbyssalLegends"} /> */}
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
               to={"/Admin/nft/edit/" + id}
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
         <NftFullInfo nft={data} />
      </InCenterAuth>
   );
};

export default NftAdd;
