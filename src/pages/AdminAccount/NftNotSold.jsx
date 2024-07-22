import InCenterAuth from "../../component/general/wrappers/InCenterAuth";
import { Title } from "../../component/general/Title";
import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import NftService from "../../services/NftService";
import Loading from "../../component/general/Loading/Loading";
import ErrorElement from "../../component/general/ErrorElement";
import NftCard from "../../component/general/nft/NftCard";

const NftNotSold = () => {
   const theme = useTheme();
   const [error, setError] = useState(false);
   const [loading, setLoading] = useState(true);
   const [nftArray, setNftArray] = useState(true);

   useEffect(() => {
      const getNft = async () => {
         try {
            const { data } = await NftService.getNotSold();
            setNftArray(data);
         } catch (error) {
            console.log(error);
            setError(error?.message);
         } finally {
            setLoading(false);
         }
      };
      getNft();
   }, []);

   if (loading) return <Loading />;

   if (error) return <ErrorElement message={error} />;

   if (nftArray.length === 0) return "empty";

   return (
      <InCenterAuth
         style={{
            background: theme.palette.background.dark,
            p: { xs: 1, sm: 4 },
         }}
         maxWidth="md"
      >
         <Title label={"NFT"} />
         <Box sx={{display:"flex",gap:2}}>
            {nftArray.map((el) => (
               <NftCard key={el?.id} nft={el} />
            ))}
         </Box>
      </InCenterAuth>
   );
};

export default NftNotSold;
