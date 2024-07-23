import nftService from "../../services/NftService";
import { useNavigate, useParams } from "react-router";
import { NftForm } from "../../component/Admin/nft/NftForm";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../component/general/Loading/Loading";
import ErrorElement from "../../component/general/ErrorElement";
import { Title } from "../../component/general/Title";
import InCenterAuth from "../../component/general/wrappers/InCenterAuth";
import { useTheme } from "@mui/material";
import { enqueueSnackbar } from "notistack";

const NftEdit = () => {
   const navigate = useNavigate();

   const { id } = useParams();

   const theme = useTheme();

   const { data, isLoading, error } = useQuery({
      queryKey: ["nftEdit"],
      queryFn: () => nftService.getById(id),
      select: ({ data }) => data,
   });

   if (isLoading) return <Loading />;

   if (error) return <ErrorElement message={error?.message} />;

   if (!data) return "empty";

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
            navigate("/Admin/nft/" + user_id);
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
      <InCenterAuth
         style={{
            background: theme.palette.background.dark,
            p: { xs: 1, sm: 4 },
         }}
         maxWidth="md"
      >
         <Title label={"Edit NFT"} />
         <NftForm nft={data} submit={onSubmit} />;
      </InCenterAuth>
   );
};

export default NftEdit;
