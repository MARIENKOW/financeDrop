import { Link, useTheme } from "@mui/material";
import { Box, Typography, Button } from "@mui/material";
import { Skeleton } from "@mui/material";
import InCenter from "../wrappers/InCenter";

export const NftFullInfo_skeleton = ({ nft }) => {
   const theme = useTheme();
   return (
      <InCenter
         style={{
            p: { xs: 2 },
         }}
         maxWidth="md"
      >
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
                  <Skeleton
                     sx={{
                        bgcolor: theme.palette.secondary.main,
                        transform: "none",
                        minHeight:'300px',
                        aspectRatio:'1/1'
                     }}
                     height={"100%"}
                     width={"100%"}
                     
                  />
               </Box>
               <Box
                  sx={{
                     flex: "50% 0 1",
                     display: "flex",
                     flexDirection: "column",
                     gap: "15px",
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
                     <Skeleton
                        sx={{
                           bgcolor: theme.palette.secondary.main,
                           transform: "none",
                        }}
                        height={"20px"}
                        width={"calc(100% - 30px)"}
                     />

                     <Skeleton
                        sx={{
                           bgcolor: theme.palette.secondary.main,
                           transform: "none",
                        }}
                        height={"20px"}
                        width={"80px"}
                     />
                     <Box
                        sx={{
                           display: "flex",
                           gap: 2,
                        }}
                     >
                        <Skeleton
                           sx={{
                              bgcolor: theme.palette.secondary.main,
                              transform: "none",
                              flex: "50% 0 1",
                           }}
                           height={"40px"}
                        />
                        <Skeleton
                           sx={{
                              bgcolor: theme.palette.secondary.main,
                              transform: "none",
                              flex: "50% 0 1",
                           }}
                           height={"40px"}
                        />
                     </Box>
                     <Skeleton
                        sx={{
                           bgcolor: theme.palette.secondary.main,
                           transform: "none",
                           flex: 1,
                        }}
                        height={"120px"}
                        width={"100%"}
                     />
                  </Box>
                  <Skeleton
                     sx={{
                        bgcolor: theme.palette.secondary.main,
                        transform: "none",
                     }}
                     height={"40px"}
                     width={"100%"}
                  />
               </Box>
            </Box>
         </Box>
      </InCenter>
   );
};
