import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme, Box } from "@mui/material";

export default function NftCard({ nft, onClick, isChecked, cardAction, sx }) {
   const theme = useTheme();
   return (
      <Card
         onClick={onClick}
         sx={{
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            bgcolor: isChecked
               ? theme.palette.success.main
               : theme.palette.secondary.light,
            height: "100%",
            ...sx,
         }}
      >
         <CardMedia
            component="img"
            alt={nft?.img?.name}
            width={"100%"}
            image={nft?.img?.path}
         />
         <CardContent
            sx={{
               display: "flex",
               flexDirection: "column",
               flex: 1,
               p: "16px !important",
            }}
         >
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
               }}
               flex={1}
            >
               <Typography
                  sx={{
                     whiteSpace: "nowrap",
                     textOverflow: "ellipsis",
                     overflow: "hidden",
                  }}
                  textAlign={"center"}
                  fontWeight={600}
                  color={theme.palette.secondary.contrastText}
                  variant="body1"
               >
                  {nft?.name}
               </Typography>
               <Typography
                  fontWeight={600}
                  variant="h6"
                  textAlign={"center"}
                  color={theme.palette.secondary.contrastText}
                  sx={{
                     // pb: 1.2,
                     pt: 1.2,
                  }}
               >
                  $ {nft?.price}
               </Typography>
            </Box>
            {/* <Box display={'flex'} flexDirection={'column'} gap={'2px'}>
               <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography
                     fontWeight={600}
                     variant="body2"
                     color={theme.palette.secondary.main}
                  >
                     term:
                  </Typography>
                  <Typography
                     fontWeight={600}
                     variant="body2"
                     color={theme.palette.secondary.contrastText}
                  >
                     {nft?.days} days
                  </Typography>
               </Box>

               <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography
                     fontWeight={600}
                     variant="body2"
                     color={theme.palette.secondary.main}
                  >
                     per day:
                  </Typography>
                  <Typography
                     fontWeight={600}
                     variant="body2"
                     color={theme.palette.secondary.contrastText}
                  >
                     {nft?.percent} %
                  </Typography>
               </Box>
            </Box> */}
         </CardContent>
         {cardAction}
      </Card>
   );
}
