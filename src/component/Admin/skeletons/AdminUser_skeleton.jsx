import { Box, Skeleton, useTheme } from "@mui/material";
import { ContainerComponent } from "../../general/wrappers/ContainerComponent";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export const AdminUser_skeleton = () => {
   const theme = useTheme();

   return (
      <Grid
         direction={{ xs: "column-reverse", md: "row" }}
         container
         mt={4}
         spacing={{ xs: 3, md: 2 }}
         columns={2}
      >
         <Grid
            display={"flex"}
            flexDirection={"column"}
            gap={{ xs: 3, md: 2 }}
            xs={2}
            md={1}
         >
            <Skeleton
               sx={{
                  width: "100%",
                  height: "115px",
                  bgcolor: theme.palette.secondary.main,
                  transform: "none",
                  display: { xs: "none", md: "block" },
               }}
            />

            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
               }}
            >
               <Box>
                  <Skeleton
                     sx={{
                        width: "100%",
                        height: "45px",
                        bgcolor: theme.palette.secondary.main,
                        transform: "none",
                     }}
                  />
               </Box>
               <Box>
                  <Skeleton
                     sx={{
                        width: "100%",
                        height: "45px",
                        bgcolor: theme.palette.secondary.main,
                        transform: "none",
                     }}
                  />
               </Box>
               <Box>
                  <Skeleton
                     sx={{
                        width: "100%",
                        height: "400px",
                        bgcolor: theme.palette.secondary.main,
                        transform: "none",
                     }}
                  />
               </Box>
            </Box>
         </Grid>
         <Grid
            display={"flex"}
            flexDirection={"column"}
            gap={{ xs: 3, md: 2 }}
            xs={2}
            md={1}
         >
            <Box>
               <Skeleton
                  sx={{
                     width: "100%",
                     height: "115px",
                     bgcolor: theme.palette.secondary.main,
                     transform: "none",
                     display: { xs: "block", md: "none" },
                  }}
               />

               <Skeleton
                  sx={{
                     mb: 2,
                     mt: { xs: 3, md: 0 },
                     width: "150px",
                     height: "30px",
                     bgcolor: theme.palette.secondary.main,
                     transform: "none",
                  }}
               />
               <Box display={"flex"} flexDirection={"column"} gap={1}>
                  <Skeleton
                     sx={{
                        width: "100%",
                        height: "80px",
                        bgcolor: theme.palette.secondary.main,
                        transform: "none",
                     }}
                  />
                  <Skeleton
                     sx={{
                        width: "100%",
                        height: "80px",
                        bgcolor: theme.palette.secondary.main,
                        transform: "none",
                     }}
                  />
                  <Skeleton
                     sx={{
                        width: "100%",
                        height: "80px",
                        bgcolor: theme.palette.secondary.main,
                        transform: "none",
                     }}
                  />
                  <Skeleton
                     sx={{
                        width: "100%",
                        height: "200px",
                        bgcolor: theme.palette.secondary.main,
                        transform: "none",
                     }}
                  />
               </Box>
            </Box>
         </Grid>
      </Grid>
   );
};
