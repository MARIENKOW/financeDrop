import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StyledAccordion } from "../../general/StyledAccordion";
import { Box, useTheme } from "@mui/material";
import { NftCardAdminUser } from "./NftCardAdminUser";
import { Empty } from "../../general/Empty";

export const NftInactiveAccordion = ({ nft, handleChange, expanded }) => {
   const theme = useTheme();

   const inactive = nft?.filter((el) => el.active !== 1) || [];

   return (
      <StyledAccordion expanded={expanded === 2} onChange={handleChange(2)}>
         <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
               <Typography color={theme.palette.secondary.main}>
                  Inactive NFT
               </Typography>
               <Typography
                  fontWeight={600}
                  variant="body1"
                  color={theme.palette.secondary.contrastText}
               >
                  ({inactive?.length || 0})
               </Typography>
            </Box>
         </AccordionSummary>
         <AccordionDetails
            sx={{ overflowX: "scroll", display: "flex", gap: 1 ,alignItems:'end'}}
         >
            {inactive && inactive?.length !== 0 ? (
               inactive.map((el) => (
                  <NftCardAdminUser
                     sx={{ width: "200px", minWidth: "200px", opacity: 0.3 }}
                     nft={el}
                     key={el?.nft?.id}
                  />
               ))
            ) : (
               <Empty />
            )}
         </AccordionDetails>
      </StyledAccordion>
   );
};
