import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StyledAccordion } from "../StyledAccordion";
import { useTheme } from "@mui/material";
import { NftCardAdminUser } from "./NftCardAdminUser";
import { Empty } from "../../general/Empty";

export const NftInactiveAccordion = ({nft,handleChange,expanded}) => {

   const theme = useTheme()

   const inactive = nft?.filter(el=>el.active!==1) || [];

   return (
      <StyledAccordion
         expanded={expanded === 2}
         onChange={handleChange(2)}
      >
         <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
            <Typography color={theme.palette.secondary.contrastText}>
               Inactive NFT
            </Typography>
         </AccordionSummary>
         <AccordionDetails>
            {inactive?.length !== 0 ? (
               inactive.map((el) => (
                  <NftCardAdminUser
                     sx={{ width: "200px", minWidth: "200px" }}
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
