import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme, Box } from "@mui/material";
import { Skeleton } from "@mui/material";

export default function NftCard_skeleton({sx}) {
   const theme = useTheme();
   return (
      <Card
         sx={{
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            bgcolor: theme.palette.secondary.light,
            height: "100%",
            ...sx
         }}
      >
         <Skeleton
            sx={{
               bgcolor: theme.palette.secondary.main,
               transform: "none",
               aspectRatio: "1/1",
            }}
            width={"100%"}
         />
         <CardContent
            sx={{
               display: "flex",
               flexDirection: "column",
               flex: 1,
               p: "16px !important",
            }}
         >
            <Box flex={1}>
               <Skeleton
                  sx={{
                     bgcolor: theme.palette.secondary.main,
                     transform: "none",
                  }}
                  width={"100%"}
                  height={"20px"}
               />
               <Box
                  sx={{ pb: 2, pt: 2 }}
                  display={"flex"}
                  justifyContent={"center"}
               >
                  <Skeleton
                     sx={{
                        bgcolor: theme.palette.secondary.main,
                        transform: "none",
                     }}
                     width={"60px"}
                     height={"20px"}
                  />
               </Box>
            </Box>
            <Box display={"flex"} flexDirection={"column"} gap={"2px"}>
               <Skeleton
                  sx={{
                     bgcolor: theme.palette.secondary.main,
                     transform: "none",
                  }}
                  width={"60px"}
                  height={"10px"}
               />
               <Skeleton
                  sx={{
                     bgcolor: theme.palette.secondary.main,
                     transform: "none",
                  }}
                  width={"70px"}
                  height={"10px"}
               />
            </Box>
         </CardContent>
      </Card>
   );
}
