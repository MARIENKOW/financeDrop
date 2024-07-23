import { useTheme } from "@mui/material";
import {Box,Typography,Button} from "@mui/material";

export const NftFullInfo = ({nft}) => {
   const theme = useTheme()
   return (
      <Box style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
         <Box
            sx={{
               display: "flex",
               flexDirection: { sm: "row", xs: "column" },
               gap: 2,
            }}
         >
            <Box
               sx={{
                  flex: "50% 0 1",
               }}
            >
               <Box
                  component={"img"}
                  sx={{ width: "100%", borderRadius: "10px" }}
                  src={nft?.img?.path}
               />
            </Box>
            <Box
               sx={{
                  flex: "50% 0 1",
                  display: "flex",
                  flexDirection: "column",
                  gap:'15px'
               }}
            >
               <Box
                  sx={{
                     display: "flex",

                     flexDirection: "column",
                     gap: "15px",
                     flex: 1,
                  }}
               >
                  <Typography
                     variant="h5"
                     color={theme.palette.secondary.contrastText}
                  >
                     {nft?.name}
                  </Typography>
                  <Typography
                     variant="h5"
                     sx={{
                        pb: 1,
                        pt: 1,
                     }}
                     color={theme.palette.secondary.contrastText}
                  >
                     $ {nft?.price}
                  </Typography>
                  <Box
                     sx={{
                        display: "flex",
                        gap: 2,
                     }}
                  >
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "center",
                           gap: 1,
                           flex: "50% 0 1",
                           background: theme.palette.background.main,
                           p: 1.5,
                           borderRadius: "10px",
                           borderWidth: "1px",
                           borderStyle: "solid",
                           borderColor: theme.palette.background.light,
                        }}
                     >
                        <Typography
                           variant="body1"
                           color={theme.palette.secondary.main}
                        >
                           term:
                        </Typography>
                        <Typography
                           variant="body1"
                           color={theme.palette.secondary.contrastText}
                        >
                           {nft?.days} days
                        </Typography>
                     </Box>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "center",
                           gap: 1,
                           flex: "50% 0 1",
                           background: theme.palette.background.main,
                           p: 1.5,
                           borderRadius: "10px",
                           borderWidth: "1px",
                           borderStyle: "solid",
                           borderColor: theme.palette.background.light,
                        }}
                     >
                        <Typography
                           variant="body1"
                           color={theme.palette.secondary.main}
                        >
                           per day:
                        </Typography>
                        <Typography
                           variant="body1"
                           color={theme.palette.secondary.contrastText}
                        >
                           {nft?.percent}%
                        </Typography>
                     </Box>
                  </Box>
                  <Box
                     sx={{
                        flex:1,
                        background: theme.palette.background.main,
                        p: 1.5,
                        borderRadius: "10px",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: theme.palette.background.light,
                     }}
                  >
                     <Typography
                        variant="body1"
                        sx={{ whiteSpace: " pre-wrap" }}
                        color={theme.palette.secondary.main}
                     >
                        {nft?.description}
                     </Typography>
                  </Box>
               </Box>
               <Button variant="outlined" component={"a"}>
                  Buy
               </Button>
            </Box>
         </Box>
      </Box>
   );
};
