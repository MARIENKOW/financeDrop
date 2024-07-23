import nftService from "../../services/NftService";
import { NftForm } from "../../component/Admin/nft/NftForm";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router";
import InCenterAuth from "../../component/general/wrappers/InCenterAuth";
import { Title } from "../../component/general/Title";
import { useTheme } from "@mui/material";

const NftAdd = () => {

   const theme = useTheme()

   const navigate = useNavigate();

   const onSubmit = (setError) => {
      return async (data) => {
         try {
            const formData = new FormData();
            for (let key in data) {
               formData.append(key, data[key]);
            }
            const { data: id } = await nftService.create(formData);
            enqueueSnackbar(`NFT successfully added`, { variant: "success" });
            navigate("/Admin/nft/" + id);
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
         <Title label={"Add new NFT"} />
         <NftForm submit={onSubmit} />;
      </InCenterAuth>
   );
};

export default NftAdd;
