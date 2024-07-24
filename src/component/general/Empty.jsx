import { Box, Typography } from "@mui/material";
import InCenter from "./wrappers/InCenter";
import SickIcon from "@mui/icons-material/Sick";

export const Empty = () => {
   return (
      <InCenter>
         <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} >
            <SickIcon sx={{ width: 50, height: 50 }} color="secondary" />
            <Typography
               color={"secondary"}
               variant="h5"
               fontWeight={600}
               textAlign={"center"}
            >
               Looks like it's empty.
            </Typography>
         </Box>
      </InCenter>
   );
};
